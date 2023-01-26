const router = require("express").Router();
const NotifFCM = require("../controllers/SendNotifFCM");

router.post("/fcm", NotifFCM.SendFCM);

module.exports = router;
