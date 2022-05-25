var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const validateEmail = require("../helpers/validateEmail");
const createToken = require("../helpers/createToken");
const sendMail = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
const jwtDecode = require('jwt-decode');
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
                  console.log(["yes", result]);
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
    db.query(sql, [email], async (err, result) => {
      if (err) res.send(err);
      if (result.length > 0) {
        const sql = `UPDATE users SET status= 'Activated' WHERE email=?`;
        db.query(sql, [email], async (err, result) => {
          if (err) res.send(err);
          return res.json({
            msg: "Your account has been activated, you can now sign in.",
          });
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
  console.log(req.headers.token, "i5demm")
  let token = req.headers.token
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6Ik9tYXJpbyIsImVtYWlsIjoibWFzc291ZGlvbWFyNTQzMjFAZ21haWwuY29tIiwiaW1hZ2UiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RtNnl3NGRuMC9pbWFnZS91cGxvYWQvdjE2NTM0Njg1Mjgvc29sZnNxY3F3cGloaWpoY3doY3MucG5nIiwiYWRkcmVzcyI6IlR1bmVIiwicGhvbmUiOiI1NTc0MDk1NyJ9LCJpYXQiOjE2NTM0NzE2OTZ9.yUwFFvukDEs0cGTIrDh3L7qrcCUMz8-zZlLLoQ5-nL0"; //token
  var decoded = jwtDecode(token)
  console.log(decoded);
  jwt.verify(token,process.env.JWT_SECRET_KEY, (err, result) => {
    if (err) return res.json({
      title: ('unauthorized', err)
    })
    
    //token is valid

    const sql ='SELECT * FROM users WHERE id=?'
    db.query(sql,[decoded.user.id], async (err,user)=>{
      console.log(decoded.user.image)
      if (err) return console.log(err)
      return res.status(200).json({
        title: 'user grabbed',
        user: {
          email: decoded.user.email,
          username: decoded.user.username,
          address:decoded.user.address,
          phone: decoded.user.phone,
          image:decoded.user.image,
          id:decoded.user.id

        }
      })
    })
    

  })
}
module.exports = { register, activate , decodeToken};
