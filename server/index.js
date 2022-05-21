const express = require("express");
const questionRoutes = require("./routes/question.routes");
const contractTypeRoutes = require('./routes/contractType.routes')
const contractTypeQuestionsRoutes = require('./routes/contraType.questions.routes')


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/questions", questionRoutes);
app.use("/api/contractType", contractTypeRoutes);
app.use("/api/contractTypeQuestions", contractTypeQuestionsRoutes);

app.listen(PORT, function () {
  console.log("listening on port 3000!");
});
