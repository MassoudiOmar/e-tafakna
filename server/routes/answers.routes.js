const router = require('express').Router();
const answersController = require("../controllers/answers.controller");

router.post('/AddAnswers',answersController.AddAnswers)
router.post('/AddAnswer',answersController.AddAnswer)
router.put('/updateAnswers/:id',answersController.updateAnswers)
router.get('/get/:contracts_id',answersController.getAnswers)
router.get('/:id',answersController.getQuestionsAnswers)
router.get("/contract/:id",answersController.getContractImage)
router.post("/updateAnswer" , answersController.updateAnswer)



module.exports = router;
