const express = require("express");
const { uploadImages } = require("../controllers/upload.controller");
const { authUser } = require("../middlwares/auth");

//middleware that checks if the images uploaded are valid (size, type ...etc)
const imageUpload = require("../middlwares/imageUpload");
const router = express.Router();

//uploadImages Endpoint
router.post("/uploadImages", authUser, imageUpload, uploadImages);

module.exports = router;
