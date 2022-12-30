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
function downloadImage(url) {
    fetch(url, {
      mode : 'no-cors',
    })
      .then(response => response.blob())
      .then(blob => {
      let blobUrl = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.download = url.replace(/^.*[\\\/]/, '');
      a.href = blobUrl;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  }
  
  
