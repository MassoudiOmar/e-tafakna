var db = require("../database-mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const numberToWords = require('number-to-words');

function formatCurrencyInWords(req,res) {
  const {number } = req.body
  const words = numberToWords.toWordsOrdinal(number, {
    language: 'fr',
  });
  const currency = numberToWords.toWords(number % 1 * 1000)
  res.send(`${words} ${currency}`);
}
let getOneUser = (email, callback) => {
  const sql = "SELECT * FROM `users` WHERE email = ? ";
  db.query(sql, [email], (err, user) => {
    callback(err, user);
  });
};

let loginUser = function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("Please fill all the fields");
  } else {
    getOneUser(email, (err, result) => {
      if (err) {
        res.send(err)
    
      } else if (!result.length) {
        return res.send("user not found");
      } else {
        try {
          bcrypt.compare(password, result[0].password, function (err, result) {
            if (err) {
              res.send(err);
            } else if (result === false) {
              res.send("login failed");
            } else if (result === true) {
              getOneUser(email, (err, result) => {
                if (err) {
                  res.send(err);
                }
                if (result[0].status === "Activated") {
                  getOneUser(email, (err, result) => {
                    if (err) {
                      res.send(err);
                    }
                    const user = {
                      id: result[0].id,
                      username: result[0].username,
                      email: result[0].email,
                      image: result[0].image,
                      address: result[0].address,
                      phone: result[0].phone,
                    };
                    jwt.sign(
                      { user },
                      process.env.JWT_SECRET_KEY,
                      (err, token) => {
                        if (err) {
                          return res.send(err);
                        }
                        res.send({
                          UsertokenInfo: token,
                          message: "login succssefull",
                        });
                      }
                    );
                  });
                } else {
                  res.send("sorry, you have no access !");
                }
              });
            } else {
              res.send("not found");
            }
          });
        } catch (err) {
          res.send(err);
        }
      }
    });
  }
};

const updatePic = (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  const sql = `UPDATE users SET image=? WHERE id=?`;
  db.query(sql, [image, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
};

const updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = `UPDATE contracts SET status = ? WHERE id=?`;
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
};

const fn =(req,res)=>{
  const {data} =req.body
  const {file} =req.files
console.log(data)
console.log(file)
}

module.exports = { loginUser, updatePic ,updateStatus,fn,formatCurrencyInWords};
