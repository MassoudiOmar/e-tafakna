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
          'Authorization': 'Bearer pdf_live_rMidCXXZtyxm6alf3YwkDAtkrG1PZbuiBfjIGOZefLJ'
      }),
      responseType: "stream"
    })

    response.data.pipe(fs.createWriteStream("image.jpg"))
  } catch (e) {
    const errorString = await streamToString(e.response.data)
    console.log(errorString)
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
  const {id,receiver,receiver_email,contracts_id}= req.body
  const sql=`INSERT INTO users_has_contracts (id,receiver ,receiver_email,contracts_id) VALUES (?,?,?,?)`
  db.sql(sql,[id,receiver,receiver_email,contracts_id], (err, result)=>{
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
let {owner,contracts_id,receiver,receiver_email} = req.body
const sql=`insert into etafakna.users_has_contracts (owner,contracts_id ,receiver ,receiver_email) values(?,?,?,?)`
db.query(sql,[owner,contracts_id,receiver,receiver_email],(err, result)=>{
    {
        if (err) console.log(err);
        else res.send(result);
      }
})
};


module.exports = {userContract,getOwner, sendcontracts}


