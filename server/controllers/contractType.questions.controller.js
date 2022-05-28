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
const deleteRelation=(req,res)=>{
  let questions_id= req.params.questions_id
  contract_types_id =req.params.contract_types_id
 let sql=`DELETE from etafakna.questions_has_contract_types   where questions_id = ? && contract_types_id = ?	`
  db.query(sql, [questions_id,contract_types_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
    res.send(result)
    }
  });
}
// get questions of specific contract_type by its id
const findQuestionsOfSpecificContract = (req, res) => {
  let {contract_id,lang} = req.params;
  let column = "";
  
  lang === "Arabe"
    ? (column = "content_AR")
    : (column = "content_FR");
  const query = `SELECT ${column} from etafakna.questions
     inner join etafakna.questions_has_contract_types on (questions.id = questions_has_contract_types.questions_id)
     inner join etafakna.contract_types on (contract_types.id = questions_has_contract_types.contract_types_id)
     where contract_types.id = ?
     order by etafakna.questions_has_contract_types.order_question ASC;`;

  db.query(query, [contract_id], (err, questions) => {
    if (err) {
      console.log(err);
    } else {
      console.log(questions);
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

module.exports = {
  affectQuestionToContractType,
  findAll,
  findQuestionsOfSpecificContract,
  deleteRelation
};
