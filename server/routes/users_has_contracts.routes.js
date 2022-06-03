const router = require('express').Router();
const send = require("../controllers/users_has_contracts.controller");

router.post("/sendContract",send.sendcontracts)

module.exports = router;
