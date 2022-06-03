const router = require('express').Router();
const contractController = require("../controllers/contract.controller");

router.post('/saveContract',contractController.getOwner)
router.get('/post',contractController.userContract)
router.get('/:id',contractController.getAllContracts)
module.exports = router;