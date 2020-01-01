const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controller/fileController.js");
const loginController = require("./controller/LoginController.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var multer = require("multer");
var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
//multer is used to upload the file
var upload = multer({ storage: storage });

// for single image upload
app.post(
  "/registration",
  upload.single("photo"),
  userController.validation,
  userController.registerUser
);
// app1.post('/login',AuthController.validator,AuthController.passwordCheck,AuthController.jwtTokenGen)
app.post(
  "/login",
  loginController.validator,
  loginController.passwordCheck,
  loginController.jwtTokenGen,
  loginController.verfiyToken
);
// emplty error handling
app.use("/*", function(req, res) {
  res.status(404);
  res.send("NOT FOUND");
});
//error handling middleware first parm err
app.use(function(err, req, res, next) {
  res.status(500);
  res.json({
    status: 500,
    message: err.message
  });
});

//for unnecessary request
app.use("/*", function(req, res) {
  res.status(404);
  res.json({
    status: 404,
    message: "Page not found"
  });
});

// listining port
app.listen(3100);
