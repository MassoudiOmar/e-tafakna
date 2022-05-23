const db = require("../database-mysql");

const affectQuestionToContractType = (req, res) => {
    let { questions_id, contract_types_id, order_question } = req.body

    const sql = `INSERT into etafakna.questions_has_contract_types (questions_id, contract_types_id, order_question) values (?,?,?)`
    db.query(sql, [questions_id, contract_types_id, order_question], (err, result) => {
        if (err) console.log(err)
        else res.send(result)
    })

}

const findQuestionsOfSpecificContract = (req, res) => {
    let contract_id = req.params.contract_id;
    let query = `SELECT questions_id, order_question FROM etafakna.questions_has_contract_types WHERE contract_types_id  = ?`
    db.query(query, [contract_id], (err, questions) => {
        if (err) { console.log(err) }
        res.json(questions)
    })
}

const findAll = (req, res) => {
    try {
        const sql = `SELECT * from questions_has_contract_types`
        db.query(sql, (err, result) => {
            if (err) res.json(err)
            else res.json(result)
        })


    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { affectQuestionToContractType, findAll , findQuestionsOfSpecificContract };