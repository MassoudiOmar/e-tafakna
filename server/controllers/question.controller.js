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
  // console.log("first")
  let query = "SELECT * FROM questions ";
  db.query(query, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(questions,'result')
      res.send(questions);
    }
  });
};
let getArQuestions = function (req, res) {

  let query = "SELECT content_AR FROM questions ";

  db.query(query, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(questions, "fwea")
      res.status(200).send(questions);
    }
  });
};

let insertQuestion = (req, res) => {
  let { content_FR, content_AR } = req.body;
  const sql = `INSERT INTO questions (content_FR,content_AR) values (?,?)`;
  db.query(sql, [content_FR, content_AR], (err, question) => {
    if (err) res.status(500).send(err);
    else res.send(question).json();
  });
};
const deleteQuestion = (req, res) => {
  const { id } = req.params
  const sql = `DELETE FROM questions WHERE id=?`
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  })
}
let updateQuestion = (req, res) => {
  let id = req.params.id;
  let { content_FR, content_AR } = req.body;
  const sql = `UPDATE questions SET content_FR = ?, content_AR = ? WHERE id = ?`;
  db.query(sql, [content_FR, content_AR, id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(result);
  });
};

const deleteQuestions=(req, res)=>{
  const {id}=req.params
const sql =`DELETE FROM questions WHERE id=?`
db.query(sql,[id], (err, result) => {
  if (err) res.send(err);
  else res.send(result);
})
}

module.exports = { getOneQuestion, insertQuestion, getAllQuestions, getArQuestions, deleteQuestions, updateQuestion };
