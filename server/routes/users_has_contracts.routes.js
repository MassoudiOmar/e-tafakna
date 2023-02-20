const router = require('express').Router();
const contractController = require("../controllers/users_has_contracts.controller");

router.get("/notnumber/:id",contractController.getnumbers)
router.post('/saveContract',contractController.userContract)
router.put("/sendContract",contractController.sendcontracts)
router.put("/updateSeen/:id",contractController.hasSeen)
router.post("/sendNotification",contractController.sendNotification)
router.delete("/deleteNotification/:id",contractController.deleteNotification)
router.put("/updateSeen/:id",contractController.hasSeen)
router.get("/notnumber/:id",contractController.getnumbers)
router.put("/sentoarchieve/:id",contractController.sentoArchieve)
router.post("/getNotification" , contractController.getNotification)
router.post("/changeNotification" , contractController.changeNotification)
router.post("/getContractIdFromPic", contractController.getContractIdFromPic)
router.put("/sentoarchieve/:id",contractController.sentoArchieve)

module.exports = router;
  
  
