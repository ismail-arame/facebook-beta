const express = require("express");
const {
  test,
  register,
  activateAccount,
  login,
  resendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
} = require("../controllers/user.controller");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

//Register Endpoint
router.post("/register", register);
//Activate Endpoint
router.post("/activate", authUser, activateAccount);
//Login Endpoint
router.post("/login", login);

router.post("/resendVerification", authUser, resendVerification);

router.post("/findUser", findUser);

router.post("/sendResetPasswordCode", sendResetPasswordCode);

router.post("/validateResetCode", validateResetCode);

router.post("/changePassword", changePassword);

//for test only
router.get("/test", test);

module.exports = router;
