const nodemailer = require("nodemailer");
const db = require("../database-mysql");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");

const resetPasswor = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.send("please put your email");
  } else {
    const sql = "SELECT * FROM users WHERE email=?";
    db.query(sql, [email], async (err, result) => {
      if (err) {
        res.send(err);
      } else if (!result.length) {
        res.send("you dont have an account");
      } else {
        var transporter = nodemailer.createTransport({
          host: "e-tafakna.com",
          port: 465,
          secure: true,
          auth: {
            user: "no-reply@e-tafakna.com",
            pass: "kVM^tE9IakqD",
          },
        });
        const resetCode = Math.floor(10000 + Math.random() * 90000);
        const salt = await bcrypt.genSalt();
        const hashedCode = await bcrypt.hash(resetCode.toString(), salt);
        var mailOptions = {
          from: "no-reply@e-tafakna.com",
          to: email,
          subject: "Hi! this is your reset code",
          html: `
          <!DOCTYPE html>
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
                  
                  <body style="background-color: white; margin-left: 10 !important; border-radius:10px;padding: 0 !important;">
                      <!-- HIDDEN PREHEADER TEXT -->
                      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
                      </div>

                      <table border="0" width="100%">
                          <!-- LOGO -->

                          <tr>
                              <td bgcolor="#1C6AE4" align="center">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <div border-radius:10px;>
                                          <td align="center" valign="top" style="border-radius:10px; padding: 2px 10px 2px 10px;"> </td>
                                      </div>
                                  </table>
                              </td>
                          </tr>
                          <div style="  display: flex; justify-content: space-between;">
                      
                                         <a href="https://e-tafakna.com">  <img src="https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665143867/Plan_de_travail_1_copie_d62ajy.png" width="75" height="60" style="display: block; border: 0px;" /> </a><p style="padding-top: 15 ">E-tafakna</p>
                                           </div><br/><br/>
                          <tr>
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style=" color: black; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 600; line-height: 25px;">
                                              <p style="margin: 0;">Reset your password</p>
                                          </td><br/><br/><br/>
                                      </tr>
                                 
                                      <td bgcolor="#ffffff" align="left" font-weight: 400; align="left">
                                      <p style="color: #666666;margin: 0;">Please enter the code into the verification boxes to reset your password</p>
                                      </td><br/>
                                      <tr>
                                          <td bgcolor="#ffffff" align="left">
                                                          <table border="0" cellspacing="0" cellpadding="0">
                                                              <tr>
                                                                  <td align="center"  font-weight: 600;><p style="font-size: 50px;  font-weight: 600; font-family: Helvetica, Arial, sans-serif;color: blue;">${resetCode}</p></td>
                                                              </tr>
                                                          </table>
                                                  
                                          </td>
                                      <tr>
                                      </tr>
                                    
                                          <td bgcolor="#ffffff" color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 200;>
                                          <p style="margin: 0;">Thanks<br>Team <a href="https://e-tafakna.com">e-Tafakna</a></p>
                                          </td>
                                      </tr>
                                  </table>
                          </tr>
                        
                      </table>
                  </body>
                  
                  </html>`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            res.send({
              service: "gmail",
              message: "email has been send",
              resetToken: hashedCode,
            });
            console.log(hashedCode);
          }
        });
      }
    });
  }
};

const updatepassword = async (req, res) => {
  const { email, newpassword, confirmPassword } = req.body;
  if (!newpassword || !confirmPassword) {
    res.send("pleas fill all the fields");
  } else {
    if (newpassword !== confirmPassword) {
      res.send("please confirm your password");
    } else {
      try {
        const salt = await bcrypt.genSalt();
        const newphashedassword = await bcrypt.hash(newpassword, salt);
        const query = "UPDATE users SET password = ? WHERE email = ?";
        db.query(query, [newphashedassword, email], (err, result) => {
          if (err) {
            res.send(err);
          }
          res.send("password updated successfully");
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};

const verifying = (req, res) => {
  const { resetCode, hashedCode } = req.body;
  if (!resetCode || !hashedCode) {
    return res.send("enter your code");
  } else {
    try {
      bcrypt.compare(
        resetCode.toString(),
        hashedCode.toString(),
        (err, result) => {
          if (err) {
            res.send(err);
          } else if (result === false) {
            console.log("not verified");
          } else if (result === true) {
            res.send("you can change your password");
          }
        }
      );
    } catch {
      console.log("first");
    }
  }
};
const payment = async (req, res) => {
  const { amount } = req.params;
  let urlDeRedireaction = "http://localhost:3000";
  console.log(amount);
  const orderNumber = () => {
    return Math.floor(Math.random() * 1000000 + 1);
  };
  const response = await fetch(
    `https://test.clictopay.com/payment/rest/register.do?amount=${amount}&currency=788&language=fr&orderNumber=${orderNumber()}&password=Df9w2Cd9M&userName=0799902133&jsonParams={"orderNumber":1234567890}&returnUrl=https://e-tafakna.com/PaymentRecieved&failUrl=https://e-tafakna.com/PaymentFailed?&expirationDate=2023-09-08T14:14:14`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Authorization: "TOKEN 854da4da3b8f36f8772f46a3992a02b9a2cbb199",
      },
    }
  ).then(async (response) => {
    const data = await response.json();
    res.send(data.formUrl);
  });
};
const updateGoogleUserPassword = async (req, res) => {
  const { newpassword, confirmPassword } = req.body;
  const { id } = req.params;
  if (!newpassword || !confirmPassword) {
    res.send("pleas fill all the fields");
  } else {
    if (newpassword !== confirmPassword) {
      res.send("please confirm your password");
    } else {
      try {
        const salt = await bcrypt.genSalt();
        const newphashedassword = await bcrypt.hash(newpassword, salt);
        const query = "UPDATE users SET password = ? WHERE id = ?";
        db.query(query, [newphashedassword, id], (err, result) => {
          if (err) {
            res.send(err);
          }
          res.send("password updated successfully");
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
const checkPaymentStatus = async (req, res) => {
  const { orderId, language } = req.params;
  const response = await fetch(
    `https://test.clictopay.com/payment/rest/getOrderStatusExtended.do?userName=0799902133&password=Df9w2Cd9M&orderId=${orderId}&language=${language}&password=Df9w2Cd9M&userName=0799902133`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Authorization: "TOKEN 854da4da3b8f36f8772f46a3992a02b9a2cbb199",
      },
    }
  ).then(async (response) => {
    const data = await response.json();
    res.send([data.orderNumber, data.actionCodeDescription, data.amount]);
  });
};

module.exports = {
  resetPasswor,
  verifying,
  updatepassword,
  payment,
  updateGoogleUserPassword,
  checkPaymentStatus,
};
