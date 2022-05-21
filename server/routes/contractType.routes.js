const contractType = require('../controllers/contractType.controller')
const router = require('express').Router()


router.post('/',contractType.insertContractType)

module.exports = router;