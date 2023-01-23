var db = require("../database-mysql");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

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
            "Bearer pdf_live_UIPJ7eyybpwmRv0NpzCMfX4HoGHERNai4U3fHzksiP8",
        }),
        responseType: "stream",
      }
    );

    response.data.pipe(fs.createWriteStream("image.jpg"));
  } catch (e) {
    // const errorString = await streamToString(e.response.data)
    // console.log(errorString)
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
const sentoArchieve = (req, res) => {
  const id = req.params.id;
  const sql = `update contracts set archieve = "true" where id = ?` ;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else res.send(result);
  });
};
let userContract = (req, res) => {
  const { owner, receiver, receiver_email, contracts_id } = req.body;
  console.log(req.body, "bodyyy");
  const sql = `INSERT INTO users_has_contracts (owner,receiver ,receiver_email,contracts_id) VALUES (?,?,?,?)`;
  db.query(
    sql,
    [owner, receiver, receiver_email, contracts_id],
    (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    }
  );
};

let getOwner = (req, res) => {
  const owner = req.body.id;
  const sql = `SELECT * FROM users_has_contracts WHERE owner=?`;
  db.query(sql, [owner], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};
const sendcontracts = (req, res) => {
  const date = function today(i) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;
    return today;
  };
  let { owner, contracts_id, receiver } = req.body;
  const sql = `INSERT INTO users_has_contracts (owner,contracts_id,receiver,date) VALUES (?,?,?,?)`;
  db.query(sql, [owner, contracts_id, receiver, date()], (err, result) => {
    {
      if (err) console.log(err);
      else res.send(result);
    }
  });
};

const sendNotification = (req, res) => {
  const date = function today(i) {
    var weekday = new Array(7);
    weekday[1] = "Lundi";
    weekday[2] = "Mardi";
    weekday[3] = "Mercredi";
    weekday[4] = "Jeudi";
    weekday[5] = "Vendredi";
    weekday[6] = "Samedi";
    weekday[7] = "Dimanche";
    var today = new Date();
    var yyyy = today.getDay();

    var funcToaddZeroMin = () =>{
      var min = today.getMinutes();
      if (min.toString().length<=1){
        return `0${min}`
      }
      else {
        return min
      }
    }
    var funcToaddZeroHours = () =>{
      var hours = today.getHours();
      if (hours.toString().length<=1){
        return `0${hours}`
      }
      else {
        return hours
      }
    }
   
    
    today = weekday[yyyy] + " à " 
    + funcToaddZeroHours + ":" + funcToaddZeroMin();
    return today;
  };

  const seen = false;
  const { owner, receiver, contracts_id } = req.body;
  console.log(req.body, "bodyyy");
  const sql = `INSERT INTO users_has_notifications (owner,receiver ,date,contracts_id,seen) VALUES (?,?,?,?,?)`;
  db.query(
    sql,
    [owner, receiver, date(), contracts_id, seen],
    (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    }
  );
};

const deleteNotification = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users_has_notifications WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};
const hasSeen = (req, res) => {
  const { id } = req.params;
  const sql = `update users_has_notifications set seen = "true" where id = ?;`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

const getnumbers = (req, res) => {
  let { id } = req.params;
  const sql = `select * from users_has_notifications where seen != "true" && receiver = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else {
      res.send(result);
    }
  });
};





const getNotification = (req,res)=>{
const {receiver_id} = req.body
db.query(`SELECT * FROM users_has_contracts where receiver=${receiver_id} and seen=0` ,(err,result)=>{
if(err)
{
  console.log(err)
  res.send("There is an Eroor in user_has_Contract Function GetNotification")
}
else { 
  console.log(result)
  res.send(result.reverse())
var ans = []
/*
for (let i = 0 ; i < result.length; i ++ ) {
db.query(`SELECT * FROM users where id=${result[i]["owner"]}`,(err,result1)=>{
if(err){
console.log(err)
res.end(err)
}
ans.push(result1[0])
if(result.length -1 == i )
res.send(ans)
})
}
*/
}
})
}
const changeNotification = (req,res)=>{
const {receiver_id} = req.body 
db.query(`UPDATE users_has_contracts set seen=1 where receiver=${receiver_id}` ,(err,result)=>{
if(err){
console.log(err)
res.send(err)

}
else 
res.send(result)
})
}
const getContractIdFromPic = (req,res)=>{
const {image_url} = req.body
db.query(`select * from contracts where contract_image="${image_url}"`,(err,result)=>{
if(err){
console.log(err)
  res.send(err)
}
else 
console.log(result[0]["id"])
db.query(`update users_has_contracts set seen=0 where contracts_id=${result[0]["id"]}`,(err1 ,result1)=>{
if(err1)
res.send(err1)
else 
res.send(result1)


})




})

}

module.exports = {
  userContract,
  getOwner,
  sendcontracts,
  sendNotification,
  deleteNotification,
  hasSeen,
  getnumbers,
  sentoArchieve,
  getNotification , 
  changeNotification , 
  getContractIdFromPic,
  
};
