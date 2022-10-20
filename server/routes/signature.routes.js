const router = require("express").Router();

const signature = require("../controllers/signatureProcess");
router.put("/uploadSignature/:id", signature.uploadSignature);
router.put("/uploadcinImg/:id", signature.uploadCin);
router.post("/uploadVideo/:id", signature.uploadVideo);
router.post("/generateFormulaire/", signature.fillContract);
router.put("/updateContractImage/:id", signature.updateContractImage);
router.put("/updateStatus/:id", signature.updateStatus);

module.exports = router;
