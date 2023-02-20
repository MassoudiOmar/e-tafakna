const router = require('express').Router();
const adminController = require("../controllers/admin.controller");
const auth = require("../midlleware/auth");

router.post('/login',adminController.loginAdmin)
router.get('/allUsers',auth,adminController.getAllUsers)
router.get('/oneUsers/:id',auth,adminController.getOneUser)
router.put('/deleteUser/:id',auth,adminController.deleteUser)
router.put('/updateStatus/:id',auth, adminController.updateStatus)
router.delete('/deleteContractTypes/:idQuestion',auth,adminController.deleteContractTypes)
router.put('/updateDescriptionFR/:id',auth, adminController.updateContractDiscriptionFR)
router.put('/updateDescriptionAR/:id', auth,adminController.updateContractDiscriptionAR)
router.put('/updateUrlFR/:id',auth, adminController.updateUrlContractFR)
router.put('/updateUrlAR/:id', auth,adminController.updateUrlContractAR)
router.put('/updaTitleFR/:id',auth, adminController.updateTitleFR)
router.put('/updateTitleAR/:id',auth, adminController.updateTitleAR)
router.put('/changePassword',auth, adminController.ChangePassword)

module.exports = router;