const router = require('express').Router();
const adminController = require("../controllers/admin.controller");

router.post('/login',adminController.loginAdmin)
router.get('/allUsers',adminController.getAllUsers)
router.get('/oneUsers/:id',adminController.getOneUser)
router.delete('/deleteUser/:id',adminController.deleteUser)
router.put('/updateStatus/:id', adminController.updateStatus)
module.exports = router;