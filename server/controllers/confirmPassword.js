const bcrypt = require("bcrypt");
require("dotenv").config();

const confirmPassword = (req, res) => {
  const {password, hashedPassword } = req.body;
  if (!password) {
    return res.send("enter your password");
  } else {
    try {
      bcrypt.compare(password.toString(), hashedPassword, (err, result) => {
        if (err) {
          res.send(err);
        } else if (result === false) {
          res.send("incorrect password");
        } else if (result === true) {
          res.send("welcome !");
        } else {
          res.send("er");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
};
module.exports = { confirmPassword };
