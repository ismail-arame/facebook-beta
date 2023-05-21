const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});
exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];
    //uploading files in series and return the url of the files in the cloud
    for (const file of files) {
      const url = await uploadToCloudinry(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const uploadToCloudinry = async (file, path) => {
  //when we await inside a for loop it doesn't work
  //in order to really await we need to do this  (creating a new Promise for each loop and resolving the value we want to return in this case we wanna return the url of the uploaded images in the cloud)
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          console.log(err, res);
          return res.status(400).json({
            message: "Upload image failed",
          });
        }
        //resolve will return the url of the uploaded image in the cloud
        resolve({
          url: res.secure_url, //when u upload to cloudinary if the upload is successfull cloudinary will return a response that conatains secure_url property which defines the url of the uploaded image in the cloud
        });
      }
    );
  });
};

//removing files in the tmp that are not valid
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
