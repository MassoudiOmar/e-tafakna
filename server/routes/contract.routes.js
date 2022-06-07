const router = require('express').Router();
const contractController = require("../controllers/contract.controller");


router.route('/')
    .post(contractController.insertContract)
router.get('/:status/:ownerId', contractController.getAllContractByStatus)
router.get("/:id",contractController.getAllContracts)
router.get("getQuestionsAnswers/:id",contractController.getQuestionsAnswers)

module.exports = router;