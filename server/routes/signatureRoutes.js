const router = require('express').Router();

const signature = require("../controllers/signatureProcess")
router.put('/uploadSignature/:id', signature.uploadSignature)
router.put('/uploadcinImg/:id', signature.uploadCin)

module.exports = router;
