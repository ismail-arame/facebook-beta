// EMAIL VERIFICATION
//encrypt and secure the user's id in a json web token and send it in the email and the user open that link in the bowser and then take that  and decode it get the id and search for the use by the id and set verified property to true
//we use a key to encode and decode

//EMAIL VERIFICATION + RESET + LOGIN

const jwt = require("jsonwebtoken");

exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  });
};
