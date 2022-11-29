const router = require("express").Router();

const signature = require("../controllers/signatureProcess");
router.put("/uploadSignature/:id", signature.uploadSignature);
router.put("/uploadcinImg/:id", signature.uploadCin);
router.post("/uploadVideo/:id", signature.uploadVideo);
router.post("/generateFormulaire/", signature.fillContract);
router.put("/updateContractImage/:id", signature.updateContractImage);
router.put("/updateStatus/:id", signature.updateStatus);
router.post("/aedValidateOtp/:clientId/:textId/:otp",signature.aedValidateOtp)
router.post("/aedRequestStatus/:clientId/:requestId",signature.aedRequestStatus)
router.post("/updateDigigoUser/:clientId/:certType/:txIdEmail/:subscriberEmail",signature.updateDigigoUser)
router.post("/unlockPin/:clientId",signature.unlockPin)
router.post("/approveAffiliation/:clientId",signature.approveAffiliation)
router.post("/aedUserInfo/:clientId/:email",signature.aedUserInfo)
router.post("/changeAffiliation/:clientId",signature.changeAffiliation)
router.post("/uploadProof/:clientId/:requestId",signature.changeAffiliation)




//unlockPin
module.exports = router;


/*

To be Done
4

I got to 12

*/