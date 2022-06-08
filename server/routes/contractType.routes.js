const contractType = require('../controllers/contractType.controller')
const router = require('express').Router()


router.post('/',contractType.insertContractType)
router.get('/',contractType.getAllContractType)
router.get('/:id/:lang',contractType.getByIdContractType)
router.get('/:id',contractType.getDataById)
router.delete('/delete/:id',contractType.deleteContractById)
router.post('/fill/:id',contractType.fillContract)

module.exports = router;