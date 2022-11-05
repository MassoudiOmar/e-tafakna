const router = require("express").Router();
//const router ="test"
const contractController = require("../controllers/contract.controller");




router.get("/f/:ownerId", contractController.getAllContractById);


module.exports = router;
