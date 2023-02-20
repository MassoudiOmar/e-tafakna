var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  get one admin Admin
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
        getAdmin(email, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            if (result[0].role === "admin") {
              try {
                bcrypt.compare(
                  password,
                  result[0].password,
                  function (err, result) {
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
                            } else {
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
                            }
                          });
                        } else {
                          res.send("sorry, you have no access !");
                        }
                      });
                    } else {
                      res.send("not found");
                    }
                  }
                );
              } catch (err) {
                res.send(err);
              }
            } else {
              res.send("access denied!");
            }
          }
        });
      }
    });
  }
};

let ChangePassword = async (req, res) => {
  const { id } = req.body;
  const sql = `SELECT * FROM users Where id=?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      try {
        bcrypt.compare(
          req.body.password,
          result[0].password,
          async (err, result) => {
            if (err) {
              res.send(err);
            } else {
              const { id } = req.body;
              const salt = await bcrypt.genSalt();
              const password = await bcrypt.hash(req.body.newPassword, salt);
              const sql = "UPDATE users SET password=? WHERE id=?";
              db.query(sql, [password, id], (err, result) => {
                if (err) {
                  res.send(err);
                } else {
                  res.send("Your password changed ");
                }
              });
            }
          }
        );
      } catch (err) {
        res.send(err);
      }
    }
  });
};

// get all users
let getAllUsers = (req, res) => {
  db.query("SELECT * FROM etafakna.users", (err, result) => {
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
  const { status } = req.body;
  const sql = `UPDATE users SET status=? WHERE id=?`;
  db.query(sql, [status, id], (err, result) => {
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

//delete contract_types
let deleteContractTypes = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM etafakna.contract_types WHERE id =?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

//update descriptionFR of contract-type
let updateContractDiscriptionFR = (req, res) => {
  const id = req.params.id;
  const { description_FR } = req.body;
  const sql = `UPDATE contract_types SET description_FR=? WHERE id=?`;
  db.query(sql, [description_FR, id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

let updateContractDiscriptionAR = (req, res) => {
  const id = req.params.id;
  const { description_AR } = req.body;
  const sql = `UPDATE contract_types SET description_AR=? WHERE id=?`;
  db.query(sql, [description_AR, id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

//update url of contract-type
let updateUrlContractFR = (req, res) => {
  const id = req.params.id;
  const { template_FR } = req.body;
  const sql = `UPDATE contract_types SET template_FR=? WHERE id=?`;
  db.query(sql, [template_FR, id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

let updateUrlContractAR = (req, res) => {
  const id = req.params.id;
  const { template_AR } = req.body;
  const sql = `UPDATE contract_types SET template_AR=? WHERE id=?`;
  db.query(sql, [template_AR, id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

//update title of contract type
let updateTitleFR = (req, res) => {
  const id = req.params.id;
  const { title_FR } = req.body;
  const sql = `UPDATE contract_types SET title_FR=? WHERE id=?`;
  db.query(sql, [title_FR, id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

let updateTitleAR = (req, res) => {
  const id = req.params.id;
  const { title_AR } = req.body;
  const sql = `UPDATE contract_types SET title_AR=? WHERE id=?`;
  db.query(sql, [title_AR, id], (err, result) => {
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
  deleteContractTypes,
  updateContractDiscriptionFR,
  updateContractDiscriptionAR,
  updateUrlContractFR,
  updateUrlContractAR,
  updateTitleFR,
  updateTitleAR,
  ChangePassword,
};
