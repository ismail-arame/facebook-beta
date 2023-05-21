const express = require("express");
const { createPost, getAllPosts } = require("../controllers/post.controller");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

//createPost Endpoint
router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", authUser, getAllPosts);

module.exports = router;
