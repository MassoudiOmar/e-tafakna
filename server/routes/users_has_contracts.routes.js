const router = require('express').Router();
const contractController = require("../controllers/users_has_contracts.controller");



router.get("/notnumber/:id",contractController.getnumbers)
router.post('/saveContract',contractController.userContract)
router.put("/sendContract",contractController.sendcontracts)
router.put("/updateSeen/:id",contractController.hasSeen)
router.post("/sendNotification",contractController.sendNotification)
router.delete("/deleteNotification/:id",contractController.deleteNotification)

module.exports = router;
