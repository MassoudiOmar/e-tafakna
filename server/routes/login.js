const router = require('express').Router();
const registrer = require("../controllers/login");
router.post('/login',registrer.loginUser)
router.put('/updatePic/:id',registrer.updatePic)
router.put('/updateStatus/:id',registrer.updateStatus)
module.exports = router;