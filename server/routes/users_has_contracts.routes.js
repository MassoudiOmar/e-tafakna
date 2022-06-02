const router = require('express').Router();
const contractController = require("../controllers/users_has_contracts.controller.controller");

router.post('/saveContract',contractController.userContract)
