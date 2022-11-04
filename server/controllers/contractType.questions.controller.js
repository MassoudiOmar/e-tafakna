const db = require("../database-mysql");

// affect question to a specific contract_type by question order in that contract_type
const affectQuestionToContractType = (req, res) => {
  let { questions_id, contract_types_id, order_question } = req.body;

  const sql = `INSERT into railway.questions_has_contract_types (questions_id, contract_types_id, order_question) values (?,?,?)`;
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
  let sql = `DELETE from railway.questions_has_contract_types  WHERE questions_id = ? && contract_types_id = ? `;
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
  {
    lang === "Arabe"
      ? ((column = "content_AR"),
        (table = "questions_AR"),
        (part2 = "part2_AR"),
        (innerjoin = "questions_has_contract_types_AR"))
      : lang == "Francais"
      ? ((column = "content_FR"),
        (table = "questions_FR"),
        (part2 = "part2_FR"),
        (innerjoin = "questions_has_contract_types_FR"))
      : ((column = "content_EN"),
        (table = "questions_EN"),
        (part2 = "part2_EN"),
        (innerjoin = "questions_has_contract_types_EN"));
  }
  const query = `SELECT ${table}.id,${table}.${column},${table}.date , ${table}.${part2},${table}.options,${table}.explanation,${table}.text_Area from railway.${table}
     inner join railway.${innerjoin} on (${table}.id =${innerjoin}.questions_id)
     inner join railway.contract_types on (contract_types.id = ${innerjoin}.contract_types_id)
     where contract_types.id = ?
     order by railway.${innerjoin}.order_question ASC;`;
  db.query(query, [contract_id], (err, table) => {
    if (err) {
      console.log(err);
    } else {
      res.send(table);
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
  order by railway.questions_has_contract_types.order_question ASC;`;
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
