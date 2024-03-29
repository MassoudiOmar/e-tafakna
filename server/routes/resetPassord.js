const router = require('express').Router();
const reset = require("../controllers/resetPassword");
const auth = require('../midlleware/auth')

router.post('/reset',reset.resetPasswor)
router.post('/activation',reset.verifying)
router.put('/update',reset.updatepassword)
router.post('/forfaitMobilePayment/:amount',reset.payment)
router.post('/getOrderStatusExtended/:orderId/:language',reset.checkPaymentStatus)
router.put('/updateGoogleUserPassword/:id',reset.updateGoogleUserPassword)
router.post('/getOrderStatusExtended/:orderId/:language',reset.checkPaymentStatus)
module.exports = router;
