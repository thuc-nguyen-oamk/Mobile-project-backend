var multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const multerFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|PNG|JPG)$/)) {
    cb(new Error('Please upload a Image'))
  } else {
    cb(null, true);
  }
};

const imageUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = multer(imageUpload);
