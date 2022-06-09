const router = require('express').Router();
const answersController = require("../controllers/answers.controller");

router.post('/AddAnswers',answersController.AddAnswers)
router.put('/updateAnswers/:id',answersController.updateAnswers)
router.get('/get/:contracts_id',answersController.getAnswers)
router.get('/:id',answersController.getQuestionsAnswers)
router.get("/contract/:id",answersController.getContractImage)


module.exports = router;