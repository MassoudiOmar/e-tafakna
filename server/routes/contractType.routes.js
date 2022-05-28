const contractType = require('../controllers/contractType.controller')
const router = require('express').Router()


router.post('/',contractType.insertContractType)
router.get('/',contractType.getAllContractType)
router.get('/:id/:lang',contractType.getByIdContractType)
router.get('/:id',contractType.getDataById)

module.exports = router;