const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/user");
const Exhibition = require("../models/exhibition");
const ExhibitionOrder = require("../models/exhibitionOrder");
const Payment = require("../models/payment");

const auth = require("../services/auth");
const config = require("../config.js");

exports.register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    let user = await User.findOne({ email }).exec();

    if (user) {
      res.status(409).json({
        err: user.googleId ? "Please login with Google" : "Email already in use"
      });
    } else {
      user = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10)
      });
      auth.setResToken(res, user);
      res.status(201).json({ username });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(404).json({ err: "User not found" });
      } else if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ err: "Incorrect password" });
      } else {
        auth.setResToken(res, user);
        res.status(200).json({ username: user.username });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
};

exports.googleAuth = async (req, res) => {
  try {
    let payload = await auth.verifyCredential(req.body.idToken);
    let user = await User.findOne({ email: payload.email }).exec();
    if (!user) {
      user = await User.create({
        username: payload.name,
        email: payload.email
      });
    }
    auth.setResToken(res, user);
    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};

exports.listPayments = (req, res) => {
  Payment.find({
    userId: req.decoded._id
  })
    .select("nameOnCard cardNumberEnding")
    .then((payments) => {
      res.status(200).json({ payments });
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
};

exports.findPaymentById = (req, res) => {
  Payment.findById(req.params.id)
    .select("nameOnCard cardNumberEnding")
    .then((payment) => {
      res.status(200).json({ payment });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

const checkOrAddPayment = async (userId, order) => {
  if (order.paymentId) {
    //authenticate one's payment
    let payment = await Payment.findById(order.paymentId).exec();
    if (payment.userId != userId) {
      throw new Error("Invalid Payment");
    }
  } else if (order.payment) {
    //save new payment
    order.payment.userId = userId;
    const payment = await Payment.create(order.payment);
    //updated order, with paymentId
    order.paymentId = payment._id;
  } else {
    throw new Error("No Payment Infomation");
  }
  return order;
};

const checkStockAndCalc = async (exhibitionId, ticketsToBuy) => {
  const exhibition = await Exhibition.findById(exhibitionId).exec();
  const { tickets: ticketsInStock } = exhibition;

  const outOfStockTypes = Object.keys(ticketsToBuy).filter(
    (key) => ticketsInStock[key].stock < ticketsToBuy[key].amount
  );
  if (outOfStockTypes.length) {
    throw new Error(`out of stock types: ${Object.keys(outOfStockTypes)}`);
  } else {
    let total = 0;
    for (let key of Object.keys(ticketsInStock)) {
      if (ticketsToBuy.hasOwnProperty(key)) {
        ticketsInStock[key].stock -= ticketsToBuy[key].amount;
        total += ticketsInStock[key].price * ticketsToBuy[key].amount;
      }
    }
    //update stock
    exhibition.tickets = ticketsInStock;
    await exhibition.save();
    //caculate total
    return total;
  }
};

const email = async (userEmail, savedOrder) => {
  try {
    const client = new OAuth2Client(
      config.gmail_client_id,
      config.gmail_client_secret,
      config.gmail_redirect_uri
    );
    client.setCredentials({ refresh_token: config.gmail_refresh_token });
    const accessToken = await client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.gmail_user,
        clientId: config.gmail_client_id,
        clientSecret: config.gmail_client_secret,
        refreshToken: config.gmail_refresh_token,
        accessToken
      }
    });
    const mailOptions = {
      from: `Timeless Museum <${config.gmail_user}>`,
      to: userEmail,
      subject: `Exhibition Tickets Confirmation - Timeless Museum`,
      html: `<p>Your order number is <b>#${savedOrder._id}</b></p>
      <br/>
      <p>Exhibition: ${savedOrder.exhibitionTitle}</p>
      `
      //todo
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Email not sent. Try again.", error);
  }
};

exports.buyTickets = async (req, res) => {
  const userId = req.decoded._id;
  const exhibitionOrder = req.body;

  const { exhibitionId, tickets: ticketsToBuy } = exhibitionOrder;

  try {
    let [order, total] = await Promise.all([
      checkOrAddPayment(userId, exhibitionOrder),
      checkStockAndCalc(exhibitionId, ticketsToBuy)
    ]);

    //generate order
    order.total = total;
    order.userId = userId;
    const exhibition = await Exhibition.findById(exhibitionId).exec();
    order.exhibitionTitle = exhibition.title;

    const savedOrder = await ExhibitionOrder.create(order);
    res.status(200).json({ exhibitionOrder: savedOrder });

    //notify user
    const user = await User.findById(userId).exec();
    email(user.email, savedOrder);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

exports.listExhibitionOrders = async (req, res) => {
  const userId = req.decoded._id;
  let page = req.query.page || 0;

  let limit = 3;
  const count = await ExhibitionOrder.find({ userId }).countDocuments();
  let totalPage = Math.ceil(count / limit);

  ExhibitionOrder.find({ userId })
    .sort({ placedTime: -1 })
    .skip(page * limit)
    .limit(limit)
    .then((exhibitionOrders) => {
      res.status(200).json({ exhibitionOrders, totalPage });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};
