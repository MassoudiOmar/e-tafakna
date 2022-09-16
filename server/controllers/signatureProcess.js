var db = require("../database-mysql");
var cloudinar = require("cloudinary");
var cloudinar = require("cloudinary").v2;

const uploadCin = (req, res) => {
    const { id } = req.params;
    const { cinImg } = req.body;
    const { faceVideo } = req.body;

    const sql = `update users SET carteCin = ? , faceVideo =? WHERE id =?`;
    db.query(sql, [cinImg, faceVideo, id], (err, result) => {
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