const router = require('express').Router();

const signature = require("../controllers/signatureProcess")
router.put('/uploadSignature/:id', signature.uploadSignature)
router.put('/uploadcinImg/:id', signature.uploadCin)
router.post('/uploadVideo/:id', signature.uploadVideo);

module.exports = router;