const router = require('express').Router();
const answersController = require("../controllers/answers.controller");

router.post('/AddAnswers',answersController.AddAnswers)
router.put('/updateAnswers/:id',answersController.updateAnswers)
router.get('/get/:id',answersController.getAnswers)


module.exports = router;