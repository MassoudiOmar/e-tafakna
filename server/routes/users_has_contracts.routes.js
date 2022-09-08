const router = require('express').Router();
const contractController = require("../controllers/users_has_contracts.controller");

router.post('/saveContract',contractController.userContract)
router.put("/sendContract",contractController.sendcontracts)
router.post("/sendNotification",contractController.sendNotification)
router.delete("/deleteNotification/:id",contractController.deleteNotification)
router.put("/updateSeen/:id",contractController.hasSeen)
router.get("/notnumber/:id",contractController.getnumbers)
router.get("/archieve/:ownerId",contractController.getArchieve)
router.put("/sentoarchieve/:id",contractController.sentoArchieve)

module.exports = router;
