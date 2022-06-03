const router = require('express').Router();
const adminController = require("../controllers/admin.controller");

router.post('/login',adminController.loginAdmin)

router.get('/allUsers',adminController.getAllUsers)
router.get('/oneUsers/:id',adminController.getOneUser)
router.put('/deleteUser/:id',adminController.deleteUser)
router.put('/updateStatus/:id', adminController.updateStatus)

router.delete('/deleteContractTypes/:idQuestion',adminController.deleteContractTypes)

router.put('/updateDescriptionFR/:id', adminController.updateContractDiscriptionFR)
router.put('/updateDescriptionAR/:id', adminController.updateContractDiscriptionAR)
router.put('/updateUrlFR/:id', adminController.updateUrlContractFR)
router.put('/updateUrlAR/:id', adminController.updateUrlContractAR)
router.put('/updaTitleFR/:id', adminController.updateTitleFR)
router.put('/updateTitleAR/:id', adminController.updateTitleAR)
router.put('/changePassword', adminController.ChangePassword)





module.exports = router;