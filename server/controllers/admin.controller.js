var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  get one admin
let getAdmin = (email, callback) => {
  const sql = "SELECT * FROM `users` WHERE email = ? ";
  db.query(sql, [email], (err, user) => {
    callback(err, user);
  });
};

// login admin
let loginAdmin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("Please Admin fill all the fields");
  } else {
    getAdmin(email, (err, result) => {
      if (err) {
        return res.send(err);
      } else if (!result.length) {
        return res.send("Admin not found");
      } else {
        try {
          bcrypt.compare(password, result[0].password, function (err, result) {
            if (err) {
              res.send(err);
            } else if (result === false) {
              res.send("login failed");
            } else if (result === true) {
              getAdmin(email, (err, result) => {
                if (err) {
                  res.send(err);
                }
                if (result[0].role === "admin") {
                  getAdmin(email, (err, result) => {
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

// get all users
let getAllUsers = (req, res) => {
  db.query("SELECT * FROM users Where role='user'", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

// get  one user
let getOneUser = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * from users where id=?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

// delete one user
let deleteUser = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users WHERE id =?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

// update status of user

let updateStatus = (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  const sql = `UPDATE users SET status=? WHERE id=?`;
  db.query(sql, [status, id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

module.exports = {
  loginAdmin,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateStatus,
};
