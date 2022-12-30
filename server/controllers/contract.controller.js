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
  const sql = `SELECT * FROM users_has_contracts c
  inner join contracts t on (t.id = c.contracts_id )
  inner join contract_types f on (f.id=t.contract_types_id)
  inner join users u on(u.id= c.owner)
  where t.status = ? && c.owner = ? `;
  db.query(sql, [status, owner], (err, result) => {
    if (err) {
      console.log(err);
    } else res.send(result);
  });
};
const getAllContractById = (req, res) => {
  const owner = req.params.ownerId;
  const sql = `SELECT * FROM users_has_contracts c
  inner join contracts t on (t.id = c.contracts_id )
  inner join contract_types f on (f.id=t.contract_types_id)
  inner join users u on(u.id= c.owner)
  where c.owner = ? `;
  db.query(sql, [owner], (err, result) => {
    if (err) {
      console.log(err);
    } else res.send(result);
  });
};

let getAllContracts = (req, res) => {
  const { id } = req.params;
  const sql = `
   select c.id, date, uo.username ,uo.image as imageOwner,ur.image as imageReciever, ur.username as receiver,c.created_at,c.contract_url,c.contract_image,ct.signed_time,ct.title_FR,ct.title_AR,ct.title_EN,c.status from users_has_contracts  uhc
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

const getArchieve = (req, res) => {
  const owner = req.params.ownerId;
  const sql = `SELECT * FROM users_has_contracts c
  inner join contracts t on (t.id = c.contracts_id )
  inner join contract_types f on (f.id=t.contract_types_id)
  inner join users u on(u.id= c.owner)
  where c.owner = ? && archieve = "true"`;
  db.query(sql, [owner], (err, result) => {
    if (err) {
      console.log(err);
    } else res.send(result);
  });
};

const deleteContract =(req,res)=>{
  const imageUri = req.body;
  var imageUrl = imageUri.toString()
  console.log(imageUrl,"lo")
const sql = `DELETE FROM etafakna.contracts WHERE (contract_url = ?)`
db.query(sql, [imageUrl], (err, result) => {
  if (err) res.send(err);
  else {
    console.log(result, "result");
    res.send(result);
  }
});

}

const changeContractStatus = (req, res) => {
  const contract_url = req.body.contract_url;
  const status = req.params.status;
  console.log(contract_url)
  const sql = `UPDATE contracts SET status = ? WHERE contract_image = ?`;
  db.query(sql, [status, contract_url], (err, result) => {
    if (err) {
      console.log(err)
      res.send(err);
    } else {
      res.send(result);
    }
  }); 
};
let getNotification = (req, res) => {
  const { id } = req.params;
  const sql = `
   select uhc.id,seen, uo.username ,uo.image as imageOwner,ur.image as imageReciever, ur.username as receiver,c.contract_url,c.contract_image,ct.signed_time,ct.title_FR,c.status ,date from users_has_notifications  uhc
      inner join users uo on (uo.id = uhc.owner)
      inner join users ur on (ur.id = uhc.receiver)
      inner join contracts c on (c.id = uhc.contracts_id)
      inner join contract_types ct on (ct.id = c.contract_types_id)
      where ur.id =?`;
  ;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else {
      res.send(result.reverse());
    }
  });
};

const updateSeen = (req,res)=>{
const {id} = req.body 
db.query(`UPDATE users_has_notifications set seen=1 where id = ${id}`,(err,result)=>{
if(err)
res.send(err)
else 
res.send(result)
})
}

let updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = `UPDATE users_has_contracts uhc
  inner join users uo on (uo.id = uhc.owner)
  inner join users ur on (ur.id = uhc.receiver)
  inner join contracts c on (c.id = uhc.contracts_id)
  inner join contract_types ct on (ct.id = c.contract_types_id)
  SET c.status= ?
  WHERE c.id =? `;
  db.query(sql, [status, id], (err, result) => {
    err ? console.log(err) : console.log(result);
  });
};

let getQuestionsAnswers = (req, res) => {
  let id = req.params.contractI;
  const sql = `select template_FR,template_AR,template_EN questions_id,content from contract_types
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

let getContractImage = (req, res) => {
  let { id } = req.params;
  const sql = `SELECT contract_image FROM contracts WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else {
      res.send(result);
    }
  });
};

const deleteContract =(req,res)=>{
  const imageUri = req.body;
  var imageUrl = imageUri.toString()
  console.log(imageUrl,"lo")
const sql = `DELETE FROM etafakna.contracts WHERE (contract_url = ?)`
db.query(sql, [imageUrl], (err, result) => {
  if (err) res.send(err);
  else {
    console.log(result, "result");
    res.send(result);
  }
});

}

module.exports = {
  insertContract,
  getAllContracts,
  getAllContractByStatus,
  getQuestionsAnswers,
  getContractImage,
  updateStatus,
  getNotification,
  changeContractStatus,
  getAllContractById,
  updateSeen,
  deleteContract,
  getArchieve,
  deleteContract
};
