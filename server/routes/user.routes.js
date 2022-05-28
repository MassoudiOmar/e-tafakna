const router = require('express').Router();
const userController = require("../controllers/user.controller");
const pass = require("../controllers/confirmPassword")

router.post("/register", userController.register);
router.post("/activation",userController.activate);
router.get("/userInfo",userController.decodeToken);
router.post('/confirmPassword',pass.confirmPassword)
module.exports = router;