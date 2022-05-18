const express = require("express");
const questionRoutes = require("./routes/question.routes");
var items = require("./database-mysql");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/questions", questionRoutes);

app.listen(PORT, function () {
  console.log("listening on port 3000!");
});
