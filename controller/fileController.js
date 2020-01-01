const user = require("../model/filemodel.js");
const bcrypt = require("bcryptjs");
function registerUser(req, res, next) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      //console.log(hash);
      user
        .create({
          username: req.body.username,
          password: hash,
          email: req.body.email,
          file: req.file.filename
        })
        .then(function(result) {
          //console.log(result);
          res.status(201);
          res.json({
            satus: 201,
            message: "You have been registered successfully"
          });
        })
        .catch(function(err) {
          // console.log(err)
          next(err);
        });
    });
  });
}

function validation(req, res, next) {
  // console.log(req.body.username);
  if (req.body.username == "") {
    res.status(200);
    res.json({
      satus: 200,
      message: "Username shouldnot be empty"
    });
  } else if (req.body.password == "") {
    res.status(200);
    res.json({
      satus: 200,
      message: "Password shouldnot be empty"
    });
  } else if (req.body.email == "") {
    res.status(200);
    res.json({
      satus: 200,
      message: "email shouldnot be empty"
    });
  } else if (req.body.filename == "") {
    res.status(200);
    res.json({
      satus: 200,
      message: "Password shouldnot be empty"
    });
  }
  user
    .findOne({
      where: { email: req.body.email }
    })
    .then(function(result) {
      // console.log(result);
      if (result === null) {
        // res.send('user not found so registeed')
        next();
      } else {
        res.status(200);
        res.json({
          satus: 200,
          message: "Email was already registered"
        });
      }
    })
    .catch(function(err) {
      next(err);
    });
}

module.exports = {
  registerUser,
  validation
};
