var db = require("../database-mysql");
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const formData = new FormData()
formData.append('instructions', JSON.stringify({
  parts: [
    {
      file: "document"
    }
  ],
  output: {
    type: "image",
    format: "jpg",
    dpi: 500
  }
}))
formData.append('document', fs.createReadStream('output.docx'));
(async () => {
  try {
    const response = await axios.post('https://api.pspdfkit.com/build', formData, {
      headers: formData.getHeaders({
          'Authorization': 'Bearer pdf_live_UIPJ7eyybpwmRv0NpzCMfX4HoGHERNai4U3fHzksiP8'
      }),
      responseType: "stream"
    })

    response.data.pipe(fs.createWriteStream("image.jpg"))
  } catch (e) {
    // const errorString = await streamToString(e.response.data)
    // console.log(errorString)
  }
})()

function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on("error", (err) => reject(err))
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
  })
}


let userContract = (req, res) => {
  const {owner,receiver,receiver_email,contracts_id}= req.body
  console.log(req.body,'bodyyy')
  const sql=`INSERT INTO users_has_contracts (owner,receiver ,receiver_email,contracts_id) VALUES (?,?,?,?)`
  db.query(sql,[owner,receiver,receiver_email,contracts_id], (err, result)=>{
    if (err) res.send(err);
    else res.send(result);
  })
}

let getOwner = (req, res) => {
  const owner = req.body.id
  const sql=`SELECT * FROM users_has_contracts WHERE owner=?`
  db.query(sql, [owner], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
}
const sendcontracts =(req, res)=>{
let {receiver,contracts_id} = req.body
const sql=`Update users_has_contracts set receiver = ? where contracts_id = ?`
db.query(sql,[receiver,contracts_id],(err, result)=>{
    {
        if (err) console.log(err);
        else res.send(result);
      }
})
};


module.exports = {userContract,getOwner, sendcontracts}


