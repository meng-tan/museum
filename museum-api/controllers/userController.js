const User = require('../models/userModel')
const Exhibition = require('../models/exhibitionModel')
const ExhibitionOrder = require('../models/exhibitionOrderModel')
const Payment = require('../models/paymentModel')

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../services/auth')
const nodemailer = require('nodemailer');

const gmailAuth = {
    type: 'oauth2',
    user: 'tanmeng.job@gmail.com',
    clientId: config.gmail_client_id,
    clientSecret: config.gmail_client_secret,
    refreshToken: config.gmail_refresh_token,
};

exports.register = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user && user.googleId) {
            res.status(409).json({ err: "Please login with Google" })
        } else if (user) {
            res.status(409).json({ err: "Email already in use" })
        } else {
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10) //hash password
            }).then(savedUser => {
                res.status(201).json({ username: savedUser.username })
            })
        }
    })
}

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            res.status(404).json({ err: "User not found" })
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).json({ err: "Incorrect password" })
        } else {
            const token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: '1h' })
            res.status(200).json({ token: token, username: user.username })
        }
    })
}


exports.googleLogin = async (req, res) => {
    try {
        //verify google token
        let idToken = req.headers['authorization'];
        let user = await auth.getGoogleUser(idToken)

        //find user, if a new user, save it
        let returningUser = await User.findOne({ email: user.email }).exec()

        if (!returningUser) {
            let newUser = await User.create(user).exec()
            const token = jwt.sign({ _id: newUser._id }, config.secret, { expiresIn: '1h' })
            res.status(200).json({ token: token, username: newUser.username })
        } else {
            const token = jwt.sign({ _id: returningUser._id }, config.secret, { expiresIn: '1h' })
            res.status(200).json({ token: token, username: returningUser.username });
        }
    } catch (err) {
        res.status(401).json({ err })

    }
}

exports.listPayments = (req, res) => {
    Payment.find({
        userId: req.decoded._id
    }).then(savedPayments => {
        //payments may be empty
        if (savedPayments.length !== 0) {
            savedPayments.map(payment => {
                payment.cardNumber = payment.cardNumber.substring(12)
                payment.cvv = ''
            })
        }
        const token = jwt.sign({ _id: req.decoded._id }, config.secret, { expiresIn: '1h' })
        res.status(200).json({ token, payments: savedPayments });
    })
}

exports.findPaymentById = (req, res) => {
    Payment.findById(req.params.id)
        .then(payment => {
            payment.cardNumber = payment.cardNumber.substring(12)
            payment.cvv = ''

            const token = jwt.sign({ _id: req.decoded._id }, config.secret, { expiresIn: '1h' })
            res.status(200).json({ token, payment });
        })
}


const checkPayment = async (userId, order) => {
    //authenticate one's payment
    if (order.paymentId) {
        let payment = await Payment.findById(order.paymentId).exec()
        if (payment.userId != userId) { throw new Error("invalid Payment") }
    } else if (order.payment) {
        //save new payment
        order.payment.userId = userId
        let payment = await Payment.create(order.payment)
        order.paymentId = payment._id
    } else {
        throw new Error("No Payment Infomation")
    }
    return order
}

const checkTicketStock = async (exhibitionId, ticketsToBuy) => {
    let exhibition = await Exhibition.findById(exhibitionId).exec()
    let ticketsInStock = exhibition.tickets
    let outOfStockTypes = Object.keys(ticketsToBuy).filter(key => ticketsInStock[key].stock < ticketsToBuy[key].amount)
    if (outOfStockTypes.length) {
        throw new Error("out of stock")
    } else {
        //update stock
        Object.keys(ticketsInStock).map(key =>
            ticketsInStock[key].stock = ticketsToBuy.hasOwnProperty(key)
                ? ticketsInStock[key].stock - ticketsToBuy[key].amount
                : ticketsInStock[key].stock)
        await exhibition.updateOne({ tickets: ticketsInStock })
        return ticketsInStock
    }
}

exports.buyTickets = async (req, res) => {
    try {
        let userId = req.decoded._id
        let exhibitionOrder = req.body
        let exhibitionId = exhibitionOrder.exhibitionId
        let ticketsToBuy = exhibitionOrder.tickets

        //updated order, with paymentId
        let [updatedOrder, ticketsInStock] = await Promise.all([checkPayment(userId, exhibitionOrder), checkTicketStock(exhibitionId, ticketsToBuy)])

        //caculate total
        let total = 0
        Object.keys(ticketsToBuy).map(key => {
            ticketsToBuy[key].price = ticketsInStock[key].price
            total += ticketsInStock[key].price * ticketsToBuy[key].amount
        })

        //generate order
        updatedOrder.total = total
        updatedOrder.userId = userId

        let exhibition = await Exhibition.findById(exhibitionId).exec()
        updatedOrder.exhibitionTitle = exhibition.title

        let savedOrder = await ExhibitionOrder.create(updatedOrder)

        //notify user
        try {
            let user = await User.findById(userId).exec()
            await Promise.race([email(user.email, savedOrder), timeout(6000)]);
        } catch (error) {
            console.log("Failed to send order confirmation")
            console.log(error)
        }
        //all set
        const token = jwt.sign({ _id: userId }, config.secret, { expiresIn: '1h' })
        res.status(200).json({ token: token, exhibitionOrder: savedOrder });

    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err.message })
    }
}

const email = (userEmail, savedOrder) => {
    return new Promise((resolve, reject) => {
        let mailOptions = {
            to: userEmail,
            subject: 'Order Confirmation',
            text: "Your order number is " + savedOrder._id
        };
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: gmailAuth,
        });
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err)
            } else {
                resolve(info)
            }
        });
    })
}

const timeout = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(reject('timeout'), ms)
    })
}

exports.listExhibitionOrders = async (req, res) => {

    let page = req.params.page
    let limit = 3

    const count = await ExhibitionOrder.find({ userId: req.decoded._id }).count()
    let totalPage = Math.ceil(count / limit);

    ExhibitionOrder.find({ userId: req.decoded._id })
        .sort({ placedTime: -1 })
        .skip(page * limit)
        .limit(limit)
        .then(exhibitionOrders => {
            const token = jwt.sign({ _id: req.decoded._id }, config.secret, { expiresIn: '1h' })
            res.status(200).json({ token, exhibitionOrders, totalPage });
        })
}





