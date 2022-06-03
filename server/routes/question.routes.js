const router = require('express').Router();
const questionController = require("../controllers/question.controller");

router.get("/:id", questionController.getOneQuestion);
router.post("/", questionController.insertQuestion);
router.delete("/:id", questionController.deleteQuestion);
router.put("/:id", questionController.updateQuestion);
router.get("/", questionController.getAllQuestions);
router.delete("/remove/:id", questionController.deleteQuestions);
module.exports = router;
