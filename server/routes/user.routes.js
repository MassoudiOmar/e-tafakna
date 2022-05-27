const router = require('express').Router();
const userController = require("../controllers/user.controller");


router.post("/register", userController.register);
router.post("/activation",userController.activate);
router.get("/userInfo",userController.decodeToken);

module.exports = router;