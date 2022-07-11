const router = require("express").Router();
const multer = require("multer");
const path = require("path");

//-----Multer for file upload--------//
var storege = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storege }).single("file");
var multipleUpload = multer({ storage: storege }).array("files");

//--------Single File Upload route --------//
router.post("/file", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    }
    let data = "http://localhost:3000/files" + req.file.filename;

    console.log(data);
    res.json({
      data,
    });
  });
});

//--------- Multiple Files upload ------------//
router.post("/multiplefiles", (req, res) => {
  multipleUpload(req, res, (err) => {
    if (err) {
      console.log(err);
    }
    let img = [];
    console.log(req.files);
    req.files.forEach((file) => {
      img.push("http://localhost:3000/" + file.filename);
    });
    res.json(img);
  });
});

module.exports = router;
