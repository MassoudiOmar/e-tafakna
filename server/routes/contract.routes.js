const router = require("express").Router();
const {
  resourcesettings,
} = require("googleapis/build/src/apis/resourcesettings");
const contractController = require("../controllers/contract.controller");

router.route("/").post(contractController.insertContract);
router.put("/:status/:contractUrl", contractController.changeContractStatus);

router.get("/:id", contractController.getAllContracts);
router.post("/archieve/:ownerId", contractController.getArchieve);
router.get("/notification/:id", contractController.getNotification);
router.get("getQuestionsAnswers/:id", contractController.getQuestionsAnswers);
router.put("/:id", contractController.updateStatus);
router.post("/updateSeen", contractController.updateSeen);
router.get("/:status/:ownerId", contractController.getAllContractByStatus);

router.post("/deletecontract", contractController.deleteContract);
router.post("/location_specific_service", contractController.getLoacation);
router.post("/update/:receiver", contractController.UpdateArchive);
router.delete(":contracts_id", contractController.deleteArchieve)
module.exports = router;
