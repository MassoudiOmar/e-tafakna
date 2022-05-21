const db = require("../database-mysql");

const affectQuestionToContractType =  (req,res)=>{
let { questions_id, contract_types_id, order_question } = req.body

    const sql = `INSERT into etafakna.questions_has_contract_types (questions_id, contract_types_id, order_question) values (?,?,?)`
     db.query(sql,[questions_id, contract_types_id, order_question],(err,result)=>{
         if (err) console.log(err)
         else res.send(result)
     })
   
}

findQuestionsOfSpecificContract = (req,res)=>{

}

const findAll =  (req,res)=>{
    try {
        const sql = `SELECT * from questions_has_contract_types`
         db.query(sql,(err,result)=>{
             if (err) res.json(err)
             else res.json(result)
         }) 


    }
    catch(err){
        console.log(err)
    }
}

module.exports = { affectQuestionToContractType, findAll };