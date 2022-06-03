const router = require('express').Router();
const contractController = require("../controllers/contract.controller");


router.route('/')
.post(contractController.insertContract)
router.get("/:id",contractController.getAllContracts)

module.exports = router;