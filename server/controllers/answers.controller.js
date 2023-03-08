var db = require("../database-mysql");

let updateAnswer = (req, res) => {
  const { content, questions_id } = req.body;
  db.query(
    `SELECT * FROM answers where questions_id=${questions_id} ORDER BY ID DESC LIMIT 1  `,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        let Temp = result;
        db.query(
          `update answers set content = '${content}' where id =${Temp[0].id}`,
          (err, result1) => {
            if (err) res.send(err);
            else {
              res.send(result1);
            }
          }
        );
      }
    }
  );
};
let AddAnswers = (req, res) => {
  const { content, questions_id, contracts_id, contracts_contract_types_id } = req.body;
  const escapedContent = db.escape(content);
  const sql = `INSERT INTO answers (content, questions_id, contracts_id, contracts_contract_types_id) VALUES (${escapedContent}, ${questions_id}, ${contracts_id}, ${contracts_contract_types_id})`;
  db.query(sql, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

let AddAnswer = (req, res) => {
  const { content, questions_id, contracts_contract_types_id } = req.body;
  const escapedContent = db.escape(content);

  const sql = `INSERT INTO answers (content ,questions_id,contracts_contract_types_id) VALUES (${escapedContent}, ${questions_id}, ${contracts_contract_types_id})`;
  db.query(
    sql,
    [content, questions_id, contracts_contract_types_id],
    (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    }
  );
};
let getAnswers = (req, res) => {
  const { contracts_id } = req.params;
  const sql = `SELECT questions_id,content  FROM answers  where contracts_id=?`;
  db.query(sql, [contracts_id], (err, result) => {
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

let getContractImage = (req, res) => {
  let { id } = req.params;
  const sql = `SELECT contract_image FROM contracts WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

let getQuestionsAnswers = (req, res) => {
  let id = req.params.id;
  const sql = `select a.id,questions_id,content from contract_types
  inner join answers as a on (contract_types.id = a.contracts_contract_types_id)
  where a.contracts_id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else {
      res.send(result);
    }
  });
};

module.exports = {
  AddAnswers,
  AddAnswer,
  updateAnswers,
  getQuestionsAnswers,
  getContractImage,
  updateAnswer,
  getAnswers
};
