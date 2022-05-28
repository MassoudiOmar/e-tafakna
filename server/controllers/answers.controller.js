var db = require("../database-mysql");

let getAnswers = (req, res) => {
  const { contracts_id } = req.body;
  const sql = `SELECT content, questions_id FROM answers  where contracts_id=?`;
  db.query(sql, [contracts_id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

let AddAnswers = (req, res) => {
  const { content, questions_id, contracts_id } = req.body;
  const sql = `INSERT INTO answers (content ,questions_id,contracts_id) VALUES (?,?,?)`;

  db.query(sql, [content, questions_id, contracts_id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

let updateAnswers = (req, res) => {
  const id = req.params.id;
  const content = req.body.content;
  const sql = `UPDATE answers SET content=? WHERE id=? `;
  db.query(sql, [content, id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

module.exports = { AddAnswers, updateAnswers, getAnswers };
