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

// let decodeToken = function (req, res) {
//   let token = req.headers.token; //token
//   jwt.verify(token, 'secretkey', (err, decoded) => {
//     if (err) return res.status(401).json({
//       title: 'unauthorized'
//     })
//     //token is valid
//     User.findOne({ _id: decoded.userId }, (err, user) => {
//       if (err) return console.log(err)
//       return res.status(200).json({
//         title: 'user grabbed',
//         user: {
//           email: user.email,
//           username: user.username,
//           address: user.address,
//           phone: user.phone,
//           image:user.image,
//           id:user.id
//         }
//       })
//     })

//   })
// }
module.exports = { loginUser };
