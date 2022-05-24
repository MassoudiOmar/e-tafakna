var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let getOneUser = (email, callback) => {
  const sql = "SELECT * FROM `users` WHERE email = ? ";
  db.query(sql, [email], (err, user) => {
    callback(err, user);
  });
};

let getStatus = (email, callback) => {
  const sql = "SELECT status FROM `users` WHERE email = ?";
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
        return res.send(err);
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
                if (result[0].status === "notBanned") {
                  getOneUser(email, (err, result) => {
                    if(err) {res.send(err)}
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
                  res.send("sorry, you are banned!");
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
module.exports = { loginUser };
