const router = require("express").Router();
const contractController = require("../controllers/contract.controller");




router.get("/f/:ownerId", contractController.getAllContractById);


module.exports = router;