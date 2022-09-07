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
    var mm = today.getMonth();
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
    weekday[0] = "Monday";
    weekday[1] = "Tuesday";
    weekday[2] = "Wednesday";
    weekday[3] = "Thursday";
    weekday[4] = "Friday";
    weekday[5] = "Saturday";
    weekday[6] = "Sunday";
    var today = new Date();
    var yyyy = today.getDay();
    var min = today.getMinutes();
    var hours = today.getHours();
    today = weekday[yyyy] + " at " + hours + ":" + min;
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
const hasSeen = (req, res) => {
  const { id } = req.params;
  const sql = `update users_has_notifications set seen = "true" where id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};
module.exports = {
  userContract,
  getOwner,
  sendcontracts,
  sendNotification,
  deleteNotification,
  getnumbers,
  hasSeen,
};
