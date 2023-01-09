const jwt = require("jsonwebtoken");

//we verify the user token validity (if he's logged in) then we pass using next()
exports.authUser = async (req, res, next) => {
  try {
    //we are sending the token on the header Key = 'Authorization', value = 'Bearer token'
    //Bearer is only for adding a security layer
    const tmp = req.header("Authorization");

    // const token = tmp.slice(" ")[1];
    const token = tmp ? tmp.slice(7, tmp.length) : "";
    if (!token) {
      //this user is not Authorized
      return res.status(400).json({
        message: "Invalid Authentification",
      });
    }

    //jwt.verify(token, privateKey, (err, decodedToken) => {})
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({
          message: "Invalid Authentification",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
