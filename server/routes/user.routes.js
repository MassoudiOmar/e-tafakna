const router = require('express').Router();
const userController = require("../controllers/user.controller");
const pass = require("../controllers/confirmPassword")

router.post("/register", userController.register);
router.post("/validation",userController.activate);
router.get("/userInfo",userController.decodeToken);
router.get("/allUsers",userController.getAllUsers);
router.post('/confirmPassword',pass.confirmPassword)
module.exports = router;