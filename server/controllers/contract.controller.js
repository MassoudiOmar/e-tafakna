const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
var db = require("../database-mysql");

const formData = new FormData();
formData.append(
  "instructions",
  JSON.stringify({
    parts: [
      {
        file: "document",
      },
    ],
    output: {
      type: "image",
      format: "jpg",
      dpi: 500,
    },
  })
);
formData.append("document", fs.createReadStream("output.docx"));
(async () => {
  try {
    const response = await axios.post(
      "https://api.pspdfkit.com/build",
      formData,
      {
        headers: formData.getHeaders({
          Authorization:
            "Bearer pdf_live_rMidCXXZtyxm6alf3YwkDAtkrG1PZbuiBfjIGOZefLJ",
        }),
        responseType: "stream",
      }
    );

    response.data.pipe(fs.createWriteStream("image.jpg"));
  } catch (e) {
    const errorString = await streamToString(e.response.data);
    console.log(errorString);
  }
})();
                
function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

let userContract = (req, res) => {
  const { id, receiver, receiver_email, contracts_id } = req.body;
  const sql = `INSERT INTO users_has_contracts (id,receiver ,receiver_email,contracts_id) VALUES (?,?,?,?)`;
  db.sql(sql, [id, receiver, receiver_email, contracts_id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

let getOwner = (req, res) => {
  const owner = req.body.id;
  const sql = `SELECT * FROM users_has_contracts WHERE owner=?`;
  db.query(sql, [owner], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

let getnot = (req, res) => {
  const email = req.body.email;
  const sql = `SELECT * FROM users_has_contracts WHERE email=?`;
  db.query(sql, [owner], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

let getAllContracts = (req, res) => {
  const { id } = req.params;

  const sql = `select uo.username as owner ,uo.image as receiver,ur.username,ct.country,c.contract_url,ct.signed_time,ct.title_FR,c.status,ct.image_url  from users_has_contracts  uhc
   inner join users uo on (uo.id = uhc.owner)
   inner join users ur on (ur.id = uhc.receiver)
   inner join contracts c on (c.id = uhc.contracts_id)
   inner join contract_types ct on (ct.id = c.contract_types_id) 
   WHERE uo.id=? OR ur.id =?;
   `;
  db.query(sql, [id, id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

module.exports = { userContract, getOwner, getnot, getAllContracts };
