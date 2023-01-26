const router = require('express').Router();
const userController = require("../controllers/user.controller");
const pass = require("../controllers/confirmPassword")
const contractController = require("../controllers/contract.controller");
const auth = require('../midlleware/auth')

router.post("/register", userController.register);
router.post("/fn", userController.fn);
router.post("/registerwithfcb", userController.registerwithfcb);
router.post("/activation",userController.activate);
router.get("/userInfo",userController.decodeToken);
router.get("/allUsers",userController.getAllUsers);
router.post('/confirmPassword',pass.confirmPassword)
router.get("/notification/:id", contractController.getNotification);
router.put('/updatenot/:id',userController.updateNotifications)
router.get('/getnotstatus/:id',userController.getnotstatus)
router.delete('/deleteUser/:userId', userController.deleteUser);
router.delete("/deleteAllNotificationOfUser/:receiver",userController.deleteAllNotificationOfUser)
router.post("/getAllAnswerOfUser" , userController.getAllAnswerOfUser)
router.post("/getNameOfSpecificContract" , userController.getNameOfSpecificContract)
router.post("/updatePassword/:id" , userController.updatePassword)
router.put("/updateInfo/:id" , userController.updateUserInfo)
router.post("/googleOuthLogin" , userController.googleOuth)
// router.put("/googleOuth" , userController.googleOuth)
// router.post("/addAnswer" ,userController.addAnswer)
// router.post("/getAllAnswerOfUser" , userController.getAllAnswerOfUser)
// router.post("/getUserInfoWithId" , userController.getUserInfoWithId)
module.exports = router;
