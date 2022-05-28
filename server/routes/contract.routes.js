const router = require('express').Router();
const contractController = require("../controllers/contract.controller");

router.post('/saveContract',contractController.userContract)
