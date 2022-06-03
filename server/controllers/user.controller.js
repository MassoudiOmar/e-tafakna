var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const validateEmail = require("../helpers/validateEmail");
const createToken = require("../helpers/createToken");
const sendMail = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const cloudinary = require("../utils/cloudinary");
var cloudinar = require("cloudinary");
var cloudinar = require("cloudinary").v2;

require("dotenv").config();

require("dotenv").config();

var register = async (req, res) => {
  try {
    //get info of user
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      address,
      username,
      image,
    } = req.body;
    const status = "notActivated";
    const created_at = new Date();
    const role = "user";
    const activate = "false";
    // check fields
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !username
    ) {
      return res.json({ msg: "please fill in all fields" });
    }

    // check email
    else if (!validateEmail(email)) {
      console.log("email not valid");
      res.send({ msg: "Please enter a valid email address." });
    } else {
      //check user

      const sql = `SELECT * FROM users WHERE email=? `;
      db.query(sql, [email], async (err, result) => {
        if (err) return res.send(err);
        if (result.length) {
          res.send({ msg: "This email is already registered in our system." });
        } else {
          try {
            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash(req.body.password, salt);
            db.query(
              "INSERT INTO users ( first_name, last_name, email, password, phone,address,username,status,image, role,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
              [
                first_name,
                last_name,
                email,
                password,
                phone,
                address,
                username,
                status,
                image,
                role,
                created_at,
              ],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.send(err);
                } else {
                  //create token
                  const newUser = { username, email, password };
                  const activation_token = createToken.activation(newUser);
                  console.log(
                    jwt.verify(activation_token, process.env.ACTIVATION_TOKEN)
                  );
                  // send email
                  const url = `${activation_token}`;
                  sendMail.sendEmailRegister(email, url, "Verify your email");
                  // registration success
                  res.json({ msg: "Welcome! Please check your email." });
                }
              }
            );
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  } catch (err) {
    res.json({ msg: err.message });
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
    db.query(sql, [email], async (err, results) => {
      if (err) res.send(err);
      if (results.length > 0) {
        const sql = `UPDATE users SET status= 'Activated' WHERE email=?`;
        db.query(sql, [email], async (err, result) => {
          console.log(result);
          if (err) res.send(err);
          else {
            const user = {
              id: results[0].id,
              username: results[0].username,
              email: results[0].email,
              image: results[0].image,
              address: results[0].address,
              phone: results[0].phone,
              password: results[0].password,
            };
            jwt.sign({ user }, process.env.JWT_SECRET_KEY, (err, token) => {
              if (err) {
                return res.send(err);
              }
              res.send({
                UsertokenInfo: token,
                msg: "Your account has been activated",
              });
            });
          }
        });
      } else {
        return res.send("wrong token");
      }
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
};

const decodeToken = function (req, res) {
  console.log(req.headers.token, "i5demm");
  let token = req.headers.token;
  var decoded = jwtDecode(token);
  console.log(decoded);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, result) => {
    if (err)
      return res.json({
        title: ("unauthorized", err),
      });
    //token is valid
    const sql ='SELECT * FROM users WHERE id=?'
    db.query(sql,[decoded.user.id], async (err,user)=>{
      console.log(user,'hennnnnnnnnneee')
      if (err) return console.log(err)
      return res.status(200).json(user)
    })
  })
}
module.exports = { register, activate ,decodeToken};
