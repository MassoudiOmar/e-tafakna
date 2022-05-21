const router = require('express').Router()
const contractTypeQuestions = require('../controllers/contractType.questions.controller')


router.post('/',contractTypeQuestions.affectQuestionToContractType)
router.get('/',contractTypeQuestions.findAll)

module.exports = router