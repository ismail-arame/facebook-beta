//file system
const fs = require("fs");

//When you upload a file, the file will be accessible from req.files because of the package express-fileupload
module.exports = async function (req, res, next) {
  try {
    //Object.values({[{},{}]}) => [[{},{}]]
    //([[{},{}]]).flat() => [{}, {}]
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({
        message: "No files selected",
      });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);
        //this line is the one making the server crashes
        return res.status(400).json({
          message: "Unsupported file format.",
        });
      }
      //1024 * 1024 = 1mb
      if (file.size > 1024 * 1024) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: "File size is too large  max 1mb allowed.",
        });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//removing files in the tmp that are not valid
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
