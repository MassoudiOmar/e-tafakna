const router = require('express').Router();
const questionController = require("../controllers/question.controller");

router.get("/:id", questionController.getOneQuestion);
router.post("/", questionController.insertQuestion);
router.delete("/:id", questionController.deleteQuestion);
router.put("/:id", questionController.updateQuestion);

module.exports = router;
