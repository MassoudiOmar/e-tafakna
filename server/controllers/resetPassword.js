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
          service: "gmail",
          auth: {
            user: "massoudiomar54321@gmail.com",
            pass: "zmeqnqeyagwrgtcu",
          },
        });
        const resetCode = Math.floor(10000 + Math.random() * 90000);
        const salt = await bcrypt.genSalt();
        const hashedCode = await bcrypt.hash(resetCode.toString(), salt);
        //  const check = await bcrypt.compare(resetCode.toString(), hashedCode.toString())
        var mailOptions = {
          from: "Etafakna.startup@gmail.com",
          to: email,
          subject: "Hi! this this your verifying code",
          text: `${resetCode}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            res.send({
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
  console.log(email,'udatzeeeeeeeeeeeeeeeeee');
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
      } catch(err) {
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
