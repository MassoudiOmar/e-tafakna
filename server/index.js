const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");



const questionRoutes = require("./routes/question.routes");
const login = require("./routes/login.js")
var items = require("./database-mysql");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/questions", questionRoutes);
app.use('/api/users',login)


app.listen(PORT, function () {
  console.log("listening on port 3000!");
});
