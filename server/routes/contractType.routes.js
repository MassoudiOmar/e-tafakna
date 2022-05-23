const contractType = require('../controllers/contractType.controller')
const router = require('express').Router()


router.post('/',contractType.insertContractType)
router.get('/',contractType.getAllContractType)
router.get('/:id',contractType.getByIdContractType)

module.exports = router;