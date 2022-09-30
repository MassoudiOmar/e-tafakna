const router = require('express').Router();

const signature = require("../controllers/signatureProcess")
router.put('/uploadCode/:id', signature.uploadCodeStatus)
router.put('/uploadcinImg/:id', signature.uploadCin)
router.post('/uploadVideo/:id', signature.uploadVideo);

module.exports = router;
