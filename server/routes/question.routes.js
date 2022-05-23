const router = require('express').Router();
const questionController = require("../controllers/question.controller");

router.get("/:contract_id", questionController.getOneQuestion);
router.post("/", questionController.insertQuestion);

module.exports = router;
