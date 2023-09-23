const config = require("../config.js");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const setResToken = (res, payload) => {
  res.set(
    "token",
    jwt.sign({ _id: payload._id }, config.jwt_secret, {
      expiresIn: "1h"
    })
  );
};

exports.setResToken = setResToken;

exports.checkToken = (req, res, next) => {
  // Express headers are auto converted to lowercase
  let token = req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ err: "Invalid Token" });
      } else {
        setResToken(res, decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ err: "Please Login" });
  }
};

exports.verifyCredential = async (idToken) => {
  try {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken,
      audience: config.oauth_client_id
    });
    let payload = ticket.getPayload(); //jwt
    return payload;
  } catch (error) {
    throw new Error("error while verifying idToken: " + error);
  }
};
