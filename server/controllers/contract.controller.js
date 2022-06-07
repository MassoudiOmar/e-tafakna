const db = require("../database-mysql");

const insertContract =(req,res)=>{
    const {contract_types_id} = req.body
    const created_at = new Date()
const sql = `INSERT into contracts (status,contract_url,created_at,contract_types_id) values (?,?,?,?)`
db.query(sql,['draft',"",created_at,contract_types_id],(err,result)=>{
    if (err) console.log(err)
    else res.send(result)
})
}
let getAllContracts = (req, res) => {
  const {id}=req.params
 
   const sql = `select uo.username ,uo.image as owner,ur.username as receiver,c.created_at,c.contract_url,ct.signed_time,ct.title_FR,c.status,ct.image_url  from users_has_contracts  uhc
   inner join users uo on (uo.id = uhc.owner)
   inner join users ur on (ur.id = uhc.receiver)
   inner join contracts c on (c.id = uhc.contracts_id)
   inner join contract_types ct on (ct.id = c.contract_types_id) 
   WHERE uo.id=? OR ur.id =?;
   `;
   db.query(sql, [id,id],(err, result) => {
     if (err) res.send(err);
     else {
      console.log(result,"result") 
      res.send(result);}
   });
 };
module.exports = {insertContract, getAllContracts}