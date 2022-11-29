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
const nodemailer = require("nodemailer");

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
    const notification = false;
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
      // Validation Password
    } else if (typeof password !== "number" && password.length !== 5) {
      res.send({ msg: "Please enter a valid password" });
      console.log("object");
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
              "INSERT INTO users ( first_name, last_name, email, password, phone,address,username,status,image, role,created_at,notification) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
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
                notification,
              ],
              async (err, result) => {
                if (err) {
                  console.log(err);
                  res.send(err);
                } else {
                  //create token
                  console.log("first");
                  var transporter = nodemailer.createTransport({
                    host: "e-tafakna.com",
                    port: 465,
                    secure: true,
                    auth: {
                      user: "no-reply@e-tafakna.com",
                      pass: "kVM^tE9IakqD",
                    },
                  });
                  const code = Math.floor(10000 + Math.random() * 90000);
                  const salt = await bcrypt.genSalt();
                  const hashedCode = await bcrypt.hash(code.toString(), salt);
                  //  const check = await bcrypt.compare(resetCode.toString(), hashedCode.toString())
                  var mailOptions = {
                    from: "no-reply@e-tafakna.com",
                    to: email,
                    subject: "Hi! this this your verifying code",
                    html: `
                  <html>

                  <head>
                      <title></title>
                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                      <style type="text/css">
                          @media screen {
                              @font-face {
                                  font-family: 'Lato';
                                  font-style: normal;
                                  font-weight: 400;
                                  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                              }
                  
                              @font-face {
                                  font-family: 'Lato';
                                  font-style: normal;
                                  font-weight: 700;
                                  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                              }
                  
                              @font-face {
                                  font-family: 'Lato';
                                  font-style: italic;
                                  font-weight: 400;
                                  src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                              }
                  
                              @font-face {
                                  font-family: 'Lato';
                                  font-style: italic;
                                  font-weight: 700;
                                  src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                              }
                          }
                  
                          /* CLIENT-SPECIFIC STYLES */
                          body,
                          table,
                          td,
                          a {
                              -webkit-text-size-adjust: 100%;
                              -ms-text-size-adjust: 100%;
                          }
                  
                          table,
                          td {
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                          }
                  
                          img {
                              -ms-interpolation-mode: bicubic;
                          }
                  
                          /* RESET STYLES */
                          img {
                              border: 0;
                              height: auto;
                              line-height: 100%;
                              outline: none;
                              text-decoration: none;
                          }
                  
                          table {
                              border-collapse: collapse !important;
                          }
                  
                          body {
                              height: 100% !important;
                              margin: 0 !important;
                              padding: 0 !important;
                              width: 100% !important;
                          }
                  
                          /* iOS BLUE LINKS */
                          a[x-apple-data-detectors] {
                              color: inherit !important;
                              text-decoration: none !important;
                              font-size: inherit !important;
                              font-family: inherit !important;
                              font-weight: inherit !important;
                              line-height: inherit !important;
                          }
                  
                          /* MOBILE STYLES */
                          @media screen and (max-width:600px) {
                              h1 {
                                  font-size: 32px !important;
                                  line-height: 32px !important;
                              }
                          }
                  
                          /* ANDROID CENTER FIX */
                          div[style*="margin: 16px 0;"] {
                              margin: 0 !important;
                          }
                      </style>
                  </head>
                  
                  <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                      <!-- HIDDEN PREHEADER TEXT -->
                      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
                      </div>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <!-- LOGO -->
                          <tr>
                              <td bgcolor="#1C6AE4" align="center">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#1C6AE4" align="center" style="padding: 0px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                              <h1 style="font-size: 48px; font-weight: 400; margin: 2;">${first_name} Welcome to E-Tafakna!</h1> <img src="https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665143867/Plan_de_travail_1_copie_d62ajy.png" width="125" height="120" style="display: block; border: 0px;" />
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">Before you start using E-Tafakna , please confirm your account by copying this code below  to the App🙂 👇🏻 :</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td bgcolor="#ffffff" align="left">
                                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                          <table border="0" cellspacing="0" cellpadding="0">
                                                              <tr>
                                                                  <td align="center" style="border-radius: 3px;" bgcolor="#1C6AE4"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #1C6AE4; display: inline-block;">${code}</a></td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                      </tr>
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">Cheers,<br>e-Tafakna Team</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                              <p style="margin: 0;"><a href="#" target="_blank" style="color: #1C6AE4;">We&rsquo;re here to help you out</a></p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                              <p style="margin: 0;">This email is confirmation that you are now registered to E-Tafakna with this Email<a href="#" target="_blank" style="color: #111111; font-weight: 700;">${email}</a>.</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </body>
                  
                  </html>
                   `,
                    text: `${code}`,
                  };

                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                    } else {
                      res.json({
                        msg: "Welcome! Please check your email.",
                        code: code.toString(),
                        email: email,
                      });
                      console.log(hashedCode);
                    }
                  });
                  // registration success

                  // registration success
                  res.json({
                    msg: "Welcome! Please check your email.",
                    code: code.toString(),
                    email: email,
                  });
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

var registerwithfcb = async (req, res) => {
  try {
    //get info of user
    const { first_name, last_name, username, image } = req.body;
    const email = "null";
    const address = "null";
    const notification = false;
    const phone = "null";
    const status = "Activated";
    const created_at = new Date();
    const role = "user";
    //check user
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, result) => {
      if (err) res.send(err);
      else if (result.length) {
        res.send("exist");
      } else {
        try {
          const genPassword = Math.floor(10000 + Math.random() * 90000);
          const salt = await bcrypt.genSalt();
          const password = await bcrypt.hash(genPassword.toString(), salt);
          db.query(
            "INSERT INTO users (first_name, last_name, email, password, phone,address,username,status,image, role,created_at,notification) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
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
              notification,
            ],
            async (err, result) => {
              if (err) {
                console.log(err);
                res.send(err);
              } else {
                const sql = `SELECT * FROM users WHERE image=image `;
                db.query(sql, [image], async (err, results) => {
                  if (err) res.send(err);
                  else {
                    const user = {
                      id: results[0].id,
                      username: results[0].username,
                      image: results[0].image,
                      password: results[0].password,
                    };
                    jwt.sign(
                      { user },
                      process.env.JWT_SECRET_KEY,
                      (err, token) => {
                        if (err) {
                          return res.send(err);
                        } else {
                          res.send({
                            UsertokenInfo: token,
                            msg: "Login succssefull",
                            password: genPassword,
                          });
                        }
                      }
                    );
                  }
                });
              }
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
};

var activate = async (req, res) => {
  const { email, activation_token, code } = req.body;
  console.log(email, activation_token, code, "lollllllllllllllllllllll");
  if (activation_token !== code) {
    res.send("wrong token");
  } else {
    const sql = `SELECT * FROM users WHERE email=? `;
    db.query(sql, [email], async (err, results) => {
      if (err) res.send(err);
      else if (results.length > 0) {
        const sql = `UPDATE users SET status= 'Activated' WHERE email=?`;
        db.query(sql, [email], async (err, result) => {
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
              } else {
                res.send({
                  UsertokenInfo: token,
                  msg: "Your account has been activated",
                });
              }
            });
          }
        });
      }
    });
  }
};

const decodeToken = function (req, res) {
  let token = req.headers.token;
  var decoded = jwtDecode(token);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, result) => {
    if (err) {
      return res.json({
        title: ("unauthorized", err),
      });
    }
    //token is valid
    const sql = "SELECT * FROM users WHERE id=?";
    db.query(sql, [decoded.user.id], async (err, user) => {
      console.log(user, "hennnnnnnnnneee");
      if (err) return console.log(err);
      return res.status(200).json(user);
    });
  });
};

const getAllUsers = async (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(questions, "result");
      res.send(questions);
    }
  });
};
const fn = function (req, res) {
  var url =
    "https://res.cloudinary.com/e-tafakna/raw/upload/v1667331037/wjvy4cbm3rn54jprkpob.docx";
  url = pdfCanvas.toDataURL(url);
  res.send(img);
};
const getnotstatus = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], (err, questions) => {
    if (err) {
      res.send(err);
    } else {
      res.send(questions);
    }
  });
};
const updateNotifications = (req, res) => {
  const id = req.params.id;
  const notification = req.body.notification;
  console.log(req.body);
  console.log(id, notification);
  const sql = "update users SET notification = ? WHERE id=?";
  db.query(sql, [notification, id], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.userId;
  const query = `DELETE FROM users WHERE id = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

module.exports = {
  register,
  activate,
  decodeToken,
  getAllUsers,
  updateNotifications,
  getnotstatus,
  registerwithfcb,
  deleteUser,
  fn,
};
