const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const questionRoutes = require("./routes/question.routes");
const usersRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const reset = require("./routes/resetPassord");
const answersRoutes = require("./routes/answers.routes");
const sendContractRoutes = require("./routes/users_has_contracts.routess")
var items = require("./database-mysql");
// const bodyParser = require("body-parser")

const contractTypeRoutes = require("./routes/contractType.routes");
const contractTypeQuestionsRoutes = require("./routes/contraType.questions.routes");
const login = require("./routes/login");

const app = express(); 
const PORT = process.env.PORT || 3000;
// app.use(express.bodyParser({limit: '500mb'}))
app.use(cors({origin:"*"}))
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/send",sendContractRoutes)
app.use("/api/questions", questionRoutes);
app.use("/api", reset);
app.use("/api/users", usersRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/contractType", contractTypeRoutes);
app.use("/api/contractTypeQuestions", contractTypeQuestionsRoutes);
app.use("/api/users",login);
app.use("/api/answers",answersRoutes)
app.listen(PORT, function () {
  console.log("listening on port 3000!");
});
