const router = require('express').Router();
const questionController = require("../controllers/question.controller");

router.get("/", questionController.selectAll);
router.post("/", questionController.insertQuestion);

module.exports = router;
