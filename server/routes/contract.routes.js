const router = require("express").Router();
const contractController = require("../controllers/contract.controller");

router.route("/").post(contractController.insertContract);
router.get("/:status/:ownerId", contractController.getAllContractByStatus);
router.get("/:id", contractController.getAllContracts);
router.get("/notification/:id", contractController.getNotification);
router.get("getQuestionsAnswers/:id", contractController.getQuestionsAnswers);
router.put("/:id", contractController.updateStatus);

module.exports = router;
