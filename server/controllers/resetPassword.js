const nodemailer = require("nodemailer");
const db = require("../database-mysql");
const bcrypt = require("bcrypt");

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
        //  const check = await bcrypt.compare(resetCode.toString(), hashedCode.toString())
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
                                          <h1 style="font-size: 48px; font-weight: 400; margin: 2;"> Welcome to E-Tafakna!</h1> <img src="https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1665143867/Plan_de_travail_1_copie_d62ajy.png" width="125" height="120" style="display: block; border: 0px;" />
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
                                              <p style="margin: 0;">This is your verifying code , please confirm your account by copying this code below  to the App🙂 👇🏻 :</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td bgcolor="#ffffff" align="left">
                                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                          <table border="0" cellspacing="0" cellpadding="0">
                                                              <tr>
                                                                  <td align="center" style="border-radius: 3px;" bgcolor="#1C6AE4"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #1C6AE4; display: inline-block;">${resetCode}</a></td>
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
                  
                  </html>                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                      <tr>
                                      </tr>
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">If you have any questions, just reply to this email&mdash;we're always happy to help out.</p>
                                          </td>
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
  console.log(email, "udatzeeeeeeeeeeeeeeeeee");
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
module.exports = { resetPasswor, verifying, updatepassword };
