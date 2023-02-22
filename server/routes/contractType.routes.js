const contractType = require('../controllers/contractType.controller')
const auth = require("../midlleware/auth");

const router = require('express').Router()
router.post('/',contractType.insertContractType)
router.get('/',auth,contractType.getAllContractType)
router.get('/:id/:lang',contractType.getByIdContractType)
router.get('/:id',contractType.getDataById)
router.delete('/delete/:id',contractType.deleteContractById)
router.post('/fill/:id',contractType.fillContract)
router.put('/updateImage/:id',contractType.updateContractImage)
router.post("/concatImages",contractType.concatImages)
router.post("/addAnswersToAnswerTable",contractType.addAnswersToAnswerTable)
router.put("/:signed_time/updatedsigned",contractType.UpdateSignedTime)
router.get("/getCount/Contracts/:lang" , contractType.getCount)

// router.post("/concatImages",contractType.concatImages)
// router.post("/ChangeStatusInContract",contractType.ChangeStatusInContract)

module.exports = router;
