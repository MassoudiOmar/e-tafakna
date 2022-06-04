const db = require("../database-mysql");


const insertContract = (req, res) => {
  const { contract_types_id } = req.body
  const created_at = new Date()
  const sql = `INSERT into contracts (status,contract_url,created_at,contract_types_id) values (?,?,?,?)`
  db.query(sql, ['draft', "", created_at, contract_types_id], (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
}
const getContractByStatus = (req, res) => {
  const status = req.params.status;
  const sql = `SELECT * FROM contracts WHERE status = ? `
  db.query(sql, [status], (err, result) => {
    if (err) {
      console.log(err)
    }
    else res.send(result)
  })
}

module.exports = { insertContract, getContractByStatus }
