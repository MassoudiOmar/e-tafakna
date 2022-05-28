const router = require('express').Router();
const reset = require("../controllers/resetPassword");

router.post('/reset',reset.resetPasswor)
router.post('/verify',reset.verifying)
router.post('/update',reset.updatepassword)
module.exports = router;
