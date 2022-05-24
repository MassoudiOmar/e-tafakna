var db = require("../database-mysql");

let getOneQuestion = function (req, res) {
  let id = req.params.id;
  let query = "SELECT * FROM questions WHERE id= ?";
  db.query(query, [id], (err, questions) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(questions);
    }
  });
};
let getAllQuestions = function (req, res) {
  let query = "SELECT * FROM questions ";
  db.query(query, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(questions);
    }
  });
};

let insertQuestion = (req, res) => {
  let { content_FR, content_AR } = req.body;
  const sql = `INSERT INTO questions (content_FR,content_AR) values (?,?)`;
  db.query(sql, [content_FR, content_AR], (err, question) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(question);
  });
};


module.exports = { getOneQuestion, insertQuestion,getAllQuestions };
