const express = require("express");
const {
  test,
  register,
  activateAccount,
  login,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);

//for test only
router.get("/test", test);

module.exports = router;
