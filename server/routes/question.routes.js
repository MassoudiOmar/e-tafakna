const router = require('express').Router();
const questionController = require("../controllers/question.controller");

router.get("/:id", questionController.getOneQuestion);
router.post("/", questionController.insertQuestion);
router.get("/", questionController.getAllQuestions);
router.delete("/remove/:id", questionController.deleteQuestions);
module.exports = router;
