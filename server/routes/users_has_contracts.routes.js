const router = require('express').Router();
const contractController = require("../controllers/users_has_contracts.controller");

router.post('/saveContract',contractController.userContract)
router.put("/sendContract",contractController.sendcontracts)

module.exports = router;
