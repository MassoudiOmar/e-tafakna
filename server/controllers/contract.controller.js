const db = require("../database-mysql");

const insertContract = (req, res) => {
  const { contract_types_id } = req.body;
  const created_at = new Date();
  const sql = `INSERT into contracts (status,contract_url,created_at,contract_types_id) values (?,?,?,?)`;
  db.query(sql, ["draft", "", created_at, contract_types_id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
};
const getAllContractByStatus = (req, res) => {
  const status = req.params.status;
  const owner = req.params.ownerId;
  const sql = `SELECT * FROM users_has_contracts
  inner join contracts on (contracts.id = users_has_contracts.contracts_id )
  where contracts.status = ? &&  users_has_contracts.owner = ?; `;
  db.query(sql, [status, owner], (err, result) => {
    if (err) {
      console.log(err);
    } else res.send(result);
  });
};

let getAllContracts = (req, res) => {
  const { id } = req.params;

  const sql = `select uo.username as owner,uo.image ,ur.username as receiver,c.created_at,c.contract_url,ct.signed_time,ct.title_FR,c.status,ct.image_url  from users_has_contracts  uhc
      inner join users uo on (uo.id = uhc.owner)
      inner join users ur on (ur.id = uhc.receiver)
      inner join contracts c on (c.id = uhc.contracts_id)
      inner join contract_types ct on (ct.id = c.contract_types_id) 
      WHERE uo.id=? OR ur.id =?;
   `;
  db.query(sql, [id, id], (err, result) => {
    if (err) res.send(err);
    else {
      console.log(result, "result");
      res.send(result);
    }
  });
};
let getQuestionsAnswers = (req, res) => {
  let id = req.params.contractI;
  const sql = `select template_FR, questions_id,content from contract_types
   inner join answers on (contract_types.id = answers.contracts_contract_types_id)
   where answers.contracts_id = ?
   `;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else {
      console.log(result, "result");
      res.send(result);
    }
  });
};
module.exports = {
  insertContract,
  getAllContracts,
  getAllContractByStatus,
  getQuestionsAnswers,
};
