const router = require("express").Router();

const signature = require("../controllers/signatureProcess");
router.put("/uploadSignature/:id", signature.uploadSignature);
router.put("/uploadcinImg/:id", signature.uploadCin);
router.post("/uploadVideo/:id", signature.uploadVideo);
router.post("/generateFormulaire/", signature.fillContract);
router.put("/updateContractImage/:id", signature.updateContractImage);
router.put("/updateStatus/:id", signature.updateStatus);
router.post("/aed-validate-otp/:clientId/:textId/:otp",signature.aedValidateOtp)
router.post("/aed-request-status/:clientId/:requestId",signature.aedRequestStatus)
router.post("/update-digigo-user/:clientId/:certType/:txIdEmail/:subscriberEmail",signature.updateDigigoUser)
router.post("/unlock-pin/:clientId",signature.unlockPin)
router.post("/approve-affiliation/:clientId",signature.approveAffiliation)
router.post("/aed-userI-info/:clientId/:email",signature.aedUserInfo)
router.post("/change-affiliation/:clientId",signature.changeAffiliation)
router.post("/upload-proof/:clientId/:requestId",signature.changeAffiliation)
router.post("/aed-send-otp", signature.sendOtp);
router.post("/create-digigo-user/:clientId", signature.createUser);
router.post("/validate-identity/:clientId", signature.validateIdentity);
router.get("/aed-user-status/:clientId/:userId/:idType/:email", signature.aedUserStatues);
router.post("/revoke-certificate/:clientId", signature.revokeCertificate);
router.post("/requset-affiliation/:clientId", signature.requestAffiliation);
router.post("/get-affiliation/:clientId/:affiliationRqtId", signature.getAffiliation);
router.post("/cancel-affiliation/:clientId", signature.cancelAffiliation);
router.get("/get-quota-aed/:clientId", signature.getQuotaAed);
router.get("/get-quota-user/:clientId/:email", signature.getQuotaUser);

module.exports = router;s


/*

To be Done
4

I got to 12

*/