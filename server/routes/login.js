const router = require('express').Router();
const registrer = require("../controllers/login");

router.post('/login',registrer.loginUser)
module.exports = router;
