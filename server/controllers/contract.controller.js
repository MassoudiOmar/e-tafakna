const db = require("../database-mysql");
let nodeGeocoder = require("node-geocoder");
//.
const insertContract = (req, res) => {
  const { contract_types_id } = req.body;

  const created_at = function today(i) {
    var today = new Date();
    var yyyy = today.getDate();
    var m = today.getMonth() + 1;
    var hours = today.getFullYear();
    today = yyyy + "-" + m + "-" + hours;
    return today;
  };

  const sql = `INSERT into contracts (status,contract_url,created_at,contract_types_id) values (?,?,?,?)`;
  db.query(
    sql,
    ["draft", "", created_at(), contract_types_id],
    (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    }
  );
};
const resultPerPage = 15;
const getAllContractByStatus = (req, res, err) => {
  var status = req.params.status;
  var owner = req.params.ownerId;
  console.log("Pagination From Contracts");

  let sql = `SELECT * FROM users_has_contracts`;
  db.query(sql, (err, result, next) => {
    if (err) {
      res.send(err);
    }
    //Pagination
    const numOfResults = result.length;
    const numberofPAGES0 = Math.ceil(numOfResults / resultPerPage);
    let page = req.query.page ? parseInt(req.query.page) : 1;
    if (page > numberofPAGES0) {
      //  return res.status(304).send("no")
      return res.send("-1");
    } else if (page < 1) {
      return res.send("/?page=" + encodeURIComponent("1"));
    }

    const startingLimit = (page - 1) * resultPerPage;
    sql = `SELECT DISTINCT *   FROM users_has_contracts c
    inner join users u on(u.id= c.owner)
    inner join contracts t on (t.id = c.contracts_id )
    inner join contract_types f on (f.id=t.contract_types_id)
    where t.status = ? && c.owner = ? ORDER BY t.id DESC LIMIT ${startingLimit},${resultPerPage} `;
    db.query(sql, [status, owner], (err, result) => {
      if (err) throw err;
      let iterator = page - 5 < 1 ? 1 : page - 5;
      let endingLink =
        iterator + 9 <= numberofPAGES0
          ? iterator + 9
          : page + (numberofPAGES0 + 9);
      if (endingLink < page + 4) {
        iterator -= page + 4 - numberofPAGES0;
      }

      res.send(result, page, iterator, endingLink, numberofPAGES0);
    });
  });
};
const getAllContractById = (req, res) => {
  const owner = req.params.ownerId;
  const sql = `SELECT * FROM users_has_contracts c
  inner join contracts t on (t.id = c.contracts_id )
  inner join contract_types f on (f.id=t.contract_types_id)
  inner join users u on(u.id= c.owner)
  where c.owner = ? `;
  db.query(sql, [owner], (err, result) => {
    if (err) {
      res.send(err);
    } else res.send(result);
  });
};
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
let getAllContracts = (req, res) => {
  const { id } = req.params;
  let sql = `
  select c.id, date,  uo.first_name as username , uo.last_name as userLastName, uo.faceVideo ,uo.image as imageOwner,ur.image as imageReciever, ur.faceVideo,ur.first_name as receiver,c.created_at,c.contract_url,c.contract_image,ct.signed_time,ct.title_FR,ct.title_AR,ct.title_EN,c.status,c.pdfContractImage from users_has_contracts  uhc
  inner join users uo on (uo.id = uhc.owner)
  inner join users ur on (ur.id = uhc.receiver)
  inner join contracts c on (c.id = uhc.contracts_id)
  inner join contract_types ct on (ct.id = c.contract_types_id)
  WHERE uo.id=? OR ur.id =?;
   `;
  db.query(sql, [id, id], (err, result) => {
    if (err) res.send(err);

    //Pagination
    const numOfResults = result.length;
    const numberofPAGES0 = Math.ceil(numOfResults / resultPerPage);
    let page = req.query.page ? parseInt(req.query.page) : 1;
    if (page > numberofPAGES0) {
      return res.send("-1");
      // return res.send("No Data")
    } else if (page < 1) {
      return res.send("/?page=" + encodeURIComponent("1"));
    }

    const startingLimit = (page - 1) * resultPerPage;
    sql = ` 
    select c.id, date,  uo.first_name as username,uo.faceVideo as colorOwner ,uo.image as imageOwner,ur.image as imageReciever, ur.faceVideo as colorReciever,ur.first_name as receiver,c.created_at,c.contract_url,c.contract_image,ct.signed_time,ct.title_FR,ct.title_AR,ct.title_EN,c.status,c.pdfContractImage , uo.first_name, uo.last_name from users_has_contracts  uhc
    inner join users uo on (uo.id = uhc.owner)
    inner join users ur on (ur.id = uhc.receiver)
    inner join contracts c on (c.id = uhc.contracts_id)
    inner join contract_types ct on (ct.id = c.contract_types_id)
    WHERE uo.id=? OR ur.id =? ORDER BY id DESC LIMIT ${startingLimit},${resultPerPage} 
    `;
    db.query(sql, [id, id], (err, result) => {
      if (err) throw err;
      let iterator = page - 5 < 1 ? 1 : page - 5;
      let endingLink =
        iterator + 9 <= numberofPAGES0
          ? iterator + 9
          : page + (numberofPAGES0 + 9);
      if (endingLink < page + 4) {
        iterator -= page + 4 - numberofPAGES0;
      }
      res.send(result, page, iterator, endingLink, numberofPAGES0);
    });
  });
};
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
const deleteContract = (req, res) => {
  let imageUri = req.body.imageUri;
  imageUri = imageUri.join(",");
  db.query(
    `delete from contracts where contract_image = "${imageUri}"`,
    (err, rez) => {
      if (err) res.send(err);
      else {
        res.send(rez);
      }
    }
  );
};
const getArchieve = (req, res) => {
  const owner = req.params.ownerId;
  let sql = ` SELECT * FROM users_has_contracts c
  inner join contracts t on (t.id = c.contracts_id )
  inner join contract_types f on (f.id=t.contract_types_id)
  inner join users u on(u.id= c.owner)
  where c.owner = ? && t.contract_image IS NOT NULL || c.receiver=? && t.status="accepted"`;
  db.query(sql, [owner, owner], (err, result) => {
    if (err) {
      res.send(err);
    }
    //Pagination
    const numOfResults = result.length;
    const numberofPAGES0 = Math.ceil(numOfResults / resultPerPage);
    let page = req.query.page ? parseInt(req.query.page) : 1;
    if (page > numberofPAGES0) {
      // return res.send("No Data")
    } else if (page < 1) {
      return res.send("/?page=" + encodeURIComponent("1"));
    }
    const startingLimit = (page - 1) * resultPerPage;
    sql = ` SELECT * FROM users_has_contracts c
    inner join users u on(u.id= c.owner)
    inner join contracts t on (t.id = c.contracts_id )
    inner join contract_types f on (f.id=t.contract_types_id)
     where c.owner = ? && t.contract_image IS NOT NULL || c.receiver=? && t.status="accepted" ORDER BY t.id DESC LIMIT ${startingLimit},${resultPerPage}`;
    db.query(sql, [owner, owner], (err, result) => {
      if (err) throw err;
      let iterator = page - 10 < 1 ? 1 : page - 10;
      let endingLink =
        iterator + 9 <= numberofPAGES0
          ? iterator + 9
          : page + (numberofPAGES0 + 9);
      if (endingLink < page + 4) {
        iterator -= page + 4 - numberofPAGES0;
      }
      res.send(result, page, iterator, endingLink, numberofPAGES0);
    });
  });
};

const changeContractStatus = (req, res) => {
  const contract_url = req.body.contract_url;
  const status = req.params.status;
  const sql = `UPDATE contracts SET status = ? WHERE contract_image = ?`;
  db.query(sql, [status, contract_url], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
let getNotification = (req, res) => {
  const { id } = req.params;
  let sql = `
   select uhc.id,seen, uo.first_name as username ,uo.image as imageOwner,uo.faceVideo as color_Username,ur.faceVideo as color_Reciever, ur.image as imageReciever,uo.first_name, uo.last_name ,ur.first_name as receiver,c.contract_url,c.pdfContractImage,c.contract_image,ct.signed_time,ct.title_FR,c.status ,date from users_has_notifications  uhc
      inner join users uo on (uo.id = uhc.owner)
      inner join users ur on (ur.id = uhc.receiver)
      inner join contracts c on (c.id = uhc.contracts_id)
      inner join contract_types ct on (ct.id = c.contract_types_id)
      where ur.id =? order by id DESC LIMIT 20`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

const updateSeen = (req, res) => {
  const { id } = req.body;
  db.query(
    `UPDATE users_has_notifications set seen=1 where id = ${id}`,
    (err, result) => {
      if (err) res.send(err);
      else res.send(result);
    }
  );
};

let updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = `UPDATE users_has_contracts uhc
  inner join users uo on (uo.id = uhc.owner)
  inner join users ur on (ur.id = uhc.receiver)
  inner join contracts c on (c.id = uhc.contracts_id)
  inner join contract_types ct on (ct.id = c.contract_types_id)
  SET c.status= ?
  WHERE c.id =? `;
  db.query(sql, [status, id], (err, result) => {
    err ? res.send(err) : res.send(result);
  });
};

let getQuestionsAnswers = (req, res) => {
  let id = req.params.contractI;
  const sql = `select template_FR,template_AR,template_EN questions_id,content from contract_types
   inner join answers on (contract_types.id = answers.contracts_contract_types_id)
   where answers.contracts_id = ?
   `;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else {
      res.send(result);
    }
  });
};

let getContractImage = (req, res) => {
  let { id } = req.params;
  const sql = `SELECT contract_image FROM contracts WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    else {
      res.send(result);
    }
  });
};
const getLoacation = (req, res) => {
  const { lat, long, lang } = req.body;
  let options = {
    provider: "openstreetmap",
    language: lang,
  };

  let geoCoder = nodeGeocoder(options);
  geoCoder
    .reverse({ lat: lat, lon: long })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  insertContract,
  getAllContracts,
  getAllContractByStatus,
  getQuestionsAnswers,
  getContractImage,
  updateStatus,
  getNotification,
  changeContractStatus,
  getAllContractById,
  updateSeen,
  deleteContract,
  getArchieve,
  getLoacation,
};
