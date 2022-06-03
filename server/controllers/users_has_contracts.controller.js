var db = require("../database-mysql");

const sendcontracts =(req, res)=>{
let {owner,contracts_id,receiver,receiver_email} = req.body
const sql=`insert into etafakna.users_has_contracts (owner,contracts_id ,receiver ,receiver_email) values(?,?,?,?)`
db.query(sql,[owner,contracts_id,receiver,receiver_email],(err, result)=>{
    {
        if (err) console.log(err);
        else res.send(result);
      }
})
};

module.exports = {sendcontracts}