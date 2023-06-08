const env = process.env.NODE_ENV || "development";
const config = require("../config.js")[env];
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(config.google_client_id);

exports.checkToken = (req, res, next) => {
  // Express headers are auto converted to lowercase
  let token = req.headers["authorization"];
  if (token) {
    // Remove Bearer from string
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ err: "invalid token" });
      } else {
        req.decoded = decoded;
        res.set(
          "token",
          jwt.sign({ _id: decoded._id }, config.secret, {
            expiresIn: "1h"
          })
        );
        next();
      }
    });
  } else {
    res.status(401).json({ err: "please login" });
  }
};

//return a promise with user informations
exports.getGoogleUser = (code) => {
  //verify the token using google client
  return client
    .verifyIdToken({ idToken: code, audience: config.google_client_id })
    .then((login) => {
      console.log("login ticket:", login);
      //if verification is ok, google returns a jwt
      let payload = login.getPayload();

      //check if the jwt is issued for our client
      let audience = payload.aud;
      if (audience !== config.google_client_id) {
        throw new Error(
          "error while authenticating google user: audience mismatch: wanted [" +
            config.google_client_id +
            "] but was [" +
            audience +
            "]"
        );
      }
      //promise the creation of a user
      return {
        username: payload["name"], //profile name
        //pic: payload['picture'], //profile pic
        googleId: payload["sub"], //google id
        //email_verified: payload['email_verified'],
        email: payload["email"]
      };
    })
    .catch((err) => {
      //throw an error if something goes wrong
      throw new Error(
        "error while authenticating google user: " + JSON.stringify(err)
      );
    });
};
