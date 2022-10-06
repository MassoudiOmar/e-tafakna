var db = require("../database-mysql");
var cloudinar = require("cloudinary");
var cloudinar = require("cloudinary").v2;

const uploadCin = (req, res) => {
  const { id } = req.params;
  const { carteCinFront, carteCinBack ,faceVideo} = req.body;
  const sql = `update users SET carteCinFront = ? , carteCinBack = ? , faceVideo =? WHERE id=?`;
  db.query(sql, [carteCinFront, carteCinBack, faceVideo, id], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

const uploadCodeStatus = (req, res) => {
  const { id } = req.params;
  const sql = `update users SET signatureCode = "en cours" WHERE id=?`;
  db.query(sql, [signatureImg, id], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};


const uploadSignature = (req, res) => {
    const { id } = req.params;
    const { signatureImg } = req.body;
    const sql = `update users SET scanSignature = ? WHERE id =?`;
    db.query(sql, [signatureImg, id], (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
};

const uploadVideo = (req, res) => {
    const { id } = req.params;
    const { faceVideo } = req.body;
    const sql = `update users SET faceVideo = ? WHERE id =?`;
    db.query(sql, [faceVideo, id], (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
};

module.exports = {
    uploadCin,
    uploadSignature,
    uploadVideo,
};
