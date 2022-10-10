const db = require("../database-mysql");

// affect question to a specific contract_type by question order in that contract_type
const affectQuestionToContractType = (req, res) => {
  let { questions_id, contract_types_id, order_question } = req.body;

  const sql = `INSERT into etafakna.questions_has_contract_types (questions_id, contract_types_id, order_question) values (?,?,?)`;
  db.query(
    sql,
    [questions_id, contract_types_id, order_question],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
};
/////////////////////////
const deleteRelation = (req, res) => {
  let questions_id = req.params.questions_id;
  let contract_types_id = req.params.contract_types_id;
  console.log(req.params);
  let sql = `DELETE from etafakna.questions_has_contract_types  WHERE questions_id = ? && contract_types_id = ? `;
  db.query(sql, [questions_id, contract_types_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
};
// get questions of specific contract_type by its id
const findQuestionsOfSpecificContract = (req, res) => {
  let { contract_id, lang } = req.params;
  let column = "";

  lang === "Arabe"
    ? (column = "content_AR")
    : lang == "Francais"
    ? (column = "content_FR")
    : (column = "content_EN");
console.log(column,'coll');
  const query = `SELECT questions.id,${column},questions.date , questions.part2_AR,questions.part2_EN,questions.part2_FR ,questions.options,questions.explanation from etafakna.questions
     inner join etafakna.questions_has_contract_types on (questions.id = questions_has_contract_types.questions_id)
     inner join etafakna.contract_types on (contract_types.id = questions_has_contract_types.contract_types_id)
     where contract_types.id = ?
     order by etafakna.questions_has_contract_types.order_question ASC;`;

  db.query(query, [contract_id], (err, questions) => {
    if (err) {
      console.log(err);
    } else {
      console.log(questions, "questions");
      res.send(questions);
    }
  });
};

// get list of id quetions with contract_type id
const findAll = (req, res) => {
  try {
    const sql = `SELECT * from questions_has_contract_types`;
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  } catch (err) {
    console.log(err);
  }
};

const findContractbyQuesId = (req, res) => {
  // let {questions_id} = req.body
  let sql = `select  title_FR,contract_types.id as id_contract_type, questions.id, content_FR, content_AR,content_EN, order_question from questions_has_contract_types 
  inner join contract_types on (questions_has_contract_types.contract_types_id = contract_types.id)
  inner join questions on (questions_has_contract_types.questions_id = questions.id)
  order by etafakna.questions_has_contract_types.order_question ASC;`;
  db.query(
    sql,
    // [questions_id]
    (err, result) => {
      if (err) console.log(err);
      else console.log(result);
      {
        res.send(result);
      }
    }
  );
};

module.exports = {
  affectQuestionToContractType,
  findAll,
  findQuestionsOfSpecificContract,
  deleteRelation,
  findContractbyQuesId,
};
