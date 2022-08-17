const router = require('express').Router();
const reset = require("../controllers/resetPassword");

router.post('/reset',reset.resetPasswor)
router.post('/activation',reset.verifying)
router.put('/update',reset.updatepassword)

module.exports = router;
