const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// const fileFilter = (req, file, cb) => {
//   const allowedFileType = ["image/png", "iamge/jpeg", "image/jpg"];
//   allowedFileType.includes(file.mimetype) ? cb(null, true) : cb(null, false);
// };

const storage = multer({ storage: diskStorage }).array("file");

module.exports = storage;
