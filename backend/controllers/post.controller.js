const Post = require("../models/Post.model");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    //in the Post Schema we have accessed the User Schema by Reference and to access the user properties we need to use populate() function
    //this function takes 2 parameters the first parameter is the Schema that we are referencing and the second parameter is for specifying the properties that we want to access if it's empty all properties are accessed
    //sort => is a function that is sorting the data based on some property in this case it will be sorting based on the createdAt property
    //if we want to sort from the oldest to the newest => 1 or "asc" | newest to oldest => -1 or "desc"
    const posts = await Post.find()
      .populate("user", "first_name last_name username picture gender")
      .sort({ createdAt: "desc" });
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
