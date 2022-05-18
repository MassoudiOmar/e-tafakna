var db = require("../database-mysql");
var selectAll = () => {};

// UNCOMMENT IF USING MYSQL WITH CALLBACKS
// var selectAll = function (req, res) {
//   db.query("SELECT * FROM items", (err, items, fields) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(items);
//     }
//   });
// };

let insertQuestion = (req, res) => {
  let { content_FR, content_AR } = req.body;
  const sql = `INSERT INTO questions (content_FR,content_AR) values (?,?)`;
  db.query(sql, [content_FR, content_AR], (err, question) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(question);
  });
};


module.exports = { selectAll, insertQuestion };
