const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
var bodyParser = require('body-parser')

const questionRoutes = require("./routes/question.routes");
const usersRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const reset = require("./routes/resetPassord");
const answersRoutes = require("./routes/answers.routes");
var items = require("./database-mysql");
const cors =require("cors")
const contractTypeRoutes = require("./routes/contractType.routes");
const contractTypeQuestionsRoutes = require("./routes/contraType.questions.routes");
const login = require("./routes/login");
const con = require("./routes/contract.routes")

const app = express(); 
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ limit: '50mb' }))

app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'*'}))
app.use("/api/questions", questionRoutes);
app.use("/api", reset);
app.use("/api/users", usersRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/contractType", contractTypeRoutes);
app.use("/api/contractTypeQuestions", contractTypeQuestionsRoutes);
app.use("/api/users",login);
app.use("/api/answers",answersRoutes)
app.use('/contarct',con)
app.listen(PORT, function () {
  console.log("listening on port 3000!");
});
