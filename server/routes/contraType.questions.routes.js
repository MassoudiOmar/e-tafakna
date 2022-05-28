const router = require('express').Router()
const contractTypeQuestions = require('../controllers/contractType.questions.controller')


router.post('/', contractTypeQuestions.affectQuestionToContractType)
router.get('/', contractTypeQuestions.findAll)
// router.get('/:contract_id', contractTypeQuestions.findQuestionsOfSpecificContract)
router.delete('/deleteRelation/:question_id',contractTypeQuestions.deleteRelation)
router.get('/:contract_id/:lang', contractTypeQuestions.findQuestionsOfSpecificContract)

module.exports = router