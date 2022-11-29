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
      !phone 
      // ||
      // !address ||
      // !username
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
                  console.log('first')
                  var transporter = nodemailer.createTransport({
                    host: 'e-tafakna.com',
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
                    html: 
                  `
                  <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }
  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1a82e2;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start logo -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
       
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end logo -->

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://e-tafakna.com" target="_blank" style="display: inline-block;">
                <img src="https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1664808728/Image-Landing-Page/logo_rdxb3d.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
              </a>
            </td>
          </tr>
        </table>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Copy the code below on the app to confirm your email address. If you didn't create an account with <a href="e-tafaknacom">e-tafakna</a>, you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start button -->
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">${code}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end button -->
          <!-- end copy -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">Cheers,<br> e-tafakna team</p>
            </td>
          </tr>
          <!-- end copy -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end copy block -->

    <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start permission -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for registration for your account. If you didn't request registration you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end permission -->

          <!-- start unsubscribe -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">To stop receiving these emails, you can <a href="https://www.blogdesire.com" target="_blank">unsubscribe</a> at any time.</p>
              <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
            </td>
          </tr>
          <!-- end unsubscribe -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end footer -->

  </table>
  <!-- end body -->

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
