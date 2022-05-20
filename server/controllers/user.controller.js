var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const validateEmail = require("../helpers/validateEmail");
const createToken = require("../helpers/createToken");
const sendMail = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");

var register = async (req, res) => {
  try {
    //get info of user
    const { first_name, last_name, email, password, phone, address, username } =
      req.body;
    const status = "notBanned";
    const role = "user";
    // check fields
    if (!first_name || !email || !password) {
      return res.status(400).json({ msg: "please fill in all fields" });
    }

    // check email
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ msg: "Please enter a valid email address." });
    }

    //check user

    const sql = `SELECT * FROM users WHERE email=? `;
    db.query(sql, [email], async (err, result) => {
      if (result.length > 0) {
        return res
          .status(400)
          .json({ msg: "This email is already registered in our system." });
      } else {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.password, salt);
        const role = "user";
        db.query(
          "INSERT INTO users ( first_name, last_name, email, password, phone,address,username,status, role) VALUES (?,?,?,?,?,?,?,?,?)",
          [
            first_name,
            last_name,
            email,
            password,
            phone,
            address,
            username,
            status,
            role,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(["yes", result]);
            }
          }
        );
      }
    });
    //create token
    const newUser = { username, email, password };
    const activation_token = createToken.activation(newUser);
    console.log(jwt.verify(activation_token, process.env.ACTIVATION_TOKEN));
    // send email
    const url = `${activation_token}`;
    sendMail.sendEmailRegister(email, url, "Verify your email");

    // registration success
    res.status(200).json({ msg: "Welcome! Please check your email." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

var activate = async (req, res) => {
  // get token
  try {
    const { activation_token } = req.body;
    // verify token
    const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN);
    const { name, email, password } = user;

    //check user
    const sql = `SELECT * FROM users WHERE email=? `;
    db.query(sql, [email], async (err, result) => {
      if (err) res.status(err);
      if (result.length > 0) {
        return res.status(200).json({
          msg: "Your account has been activated, you can now sign in.",
        });
      } else {
        return res.send("wrong token");
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
module.exports = { register, activate };
