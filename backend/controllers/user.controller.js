const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");

const { generateToken } = require("../helpers/tokens");

const { sendVerificationEmail } = require("../helpers/mailer");

const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.test = (req, res) => {
  res.send("test test test test");
};

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }

    //checking if the email is already in the database
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address is already exists, try with a diffrent email address",
      });
    }

    //validating Length
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must be between 3 and 30 characters.",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must be between 3 and 30 characters.",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be at least 6 characters.",
      });
    }

    //encrypting the Password
    const cryptedPassword = await bcrypt.hash(password, 12);
    // console.log(cryptedPassword);

    //Generating the username
    const tempUsername = first_name + last_name;

    const newUsername = await validateUsername(tempUsername);

    // return; //this is only temporary because we don't want send data to database while we are testing validation

    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    // console.log(emailVerificationToken);

    //when the user presses confirm you acount on his mail he will be directed to the activate page that we gonna create, and on this page we are going to take the email verification Token and from it we get the ID and do all the verification stuff
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success, please activate your email to start",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    // console.log("token : ", token);
    //jwt.verify() => synchronously verify given token with a public or a secret key to get a decoded token
    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    const check = await User.findById(user.id);
    if (check.verified) {
      res.status(400).json({
        message: "this email address is already activated",
      });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({
        message: "Account has been successfully activated",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    //Email is INVALID
    if (!user) {
      return res.status(400).json({
        message: "The email address you entered is not connected to an account",
      });
    }

    // Checking Password
    const check = await bcrypt.compare(password, user.password);
    //Password is INVALID
    if (!check) {
      return res.status(400).json({
        message: "Invalid Credentials, please try again.",
      });
    }

    //Credentials ARE VALID :
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
