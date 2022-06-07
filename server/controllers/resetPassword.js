const nodemailer = require("nodemailer");
const db = require("../database-mysql");
const bcrypt = require("bcrypt");

const resetPasswor = async (req, res) => {
  const { email } = req.body;
  console.log(req.body)
  if (!email) {
    res.send('please put your email')
  } else {
    const sql = 'SELECT * FROM users WHERE email=?'
    db.query(sql, [email], async (err, result) => {
      if (err) {
        res.send(err)
      }
      else if (!result.length) {
        res.send('you dont have an account')
      } else {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "etafakna0@gmail.com",
            pass: "(59b/AWY3&P!+w*",
          },
        });
        const resetCode = Math.floor(100000 + Math.random() * 900000);
        const salt = await bcrypt.genSalt();
        const hashedCode = await bcrypt.hash(resetCode.toString(), salt);
        //  const check = await bcrypt.compare(resetCode.toString(), hashedCode.toString())
        var mailOptions = {
          from: "etafakna0@gmail.com",
          to: email,
          subject: "Hi! this this your verifying code",
          text: `${resetCode}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
          } else {
            res.send({ message: 'email has been send', resetToken: hashedCode })
            console.log(hashedCode)
          }
        });
      }
    });
  }
};

const updatepassword = async (req, res) => {
  const { email, newpassword, confirmPassword } = req.body
  console.log(email, newpassword, confirmPassword)
  if (!newpassword || !confirmPassword) {
    res.send('pleas fill all the fields')
  } else {
    if (newpassword !== confirmPassword) {
      res.send('please confirm your password')
    } else {
      try {
        const salt = await bcrypt.genSalt();
        const newphashedassword = await bcrypt.hash(newpassword, salt);
        const query = 'UPDATE users SET password = ? WHERE email = ?';
        db.query(query, [newphashedassword, email], (err, result) => {
          if (err) { res.send(err) }
          res.send('password updated successfully')
        })
      } catch {
        console.log('err')
      }
    }
  }

};

const verifying = (req, res) => {
  const { resetCode, hashedCode } = req.body;
  console.log(req.body)
  if (!resetCode || !hashedCode) {
    return res.send('enter your code')
  } else {
    try {
      bcrypt.compare(resetCode.toString(), hashedCode.toString(), (err, result) => {
        if (err) {
          res.send(err);
        } else if (result === false) {
          res.send("not verified");
        } else if (result === true) {
          res.send('you can change your password')
        }
      })

    } catch {
      console.log("first")
    }
  }


}
module.exports = { resetPasswor, verifying, updatepassword };
