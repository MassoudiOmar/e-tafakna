const router = require('express').Router();
const questionController = require("../controllers/question.controller");

router.get("/:id", questionController.getOneQuestion);
router.post("/", questionController.insertQuestion);
router.get("/", questionController.getAllQuestions);
module.exports = router;
