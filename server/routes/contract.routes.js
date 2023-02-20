const router = require("express").Router();
const contractController = require("../controllers/contract.controller");
router.route("/").post(contractController.insertContract);

router.put("/:status/:contractUrl", contractController.changeContractStatus);
router.get("/:id", contractController.getAllContracts);
router.post("/archieve/:ownerId",contractController.getArchieve)
router.get("/notification/:id", contractController.getNotification);
router.get("getQuestionsAnswers/:id", contractController.getQuestionsAnswers);
router.put("/:id", contractController.updateStatus);
router.post("/updateSeen" , contractController.updateSeen)
router.get("/:status/:ownerId", contractController.getAllContractByStatus);
router.post("/deletecontract" , contractController.deleteContract)
router.post("/location_specific_service", contractController.getLoacation);

module.exports = router;
