const router = require('express').Router();
const reset = require("../controllers/resetPassword");
const auth = require('../midlleware/auth')

router.post('/reset',auth,reset.resetPasswor)
router.post('/activation',reset.verifying)
router.put('/update',reset.updatepassword)

module.exports = router;
