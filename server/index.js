const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const questionRoutes = require("./routes/question.routes");
const usersRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const reset = require("./routes/resetPassord");
const answersRoutes = require("./routes/answers.routes");
const contractRoutes = require("./routes/contract.routes");
const contractRoutess = require("./routes/contract2.routes");
const usersContractsRoutes = require("./routes/users_has_contracts.routes");
const signature = require("./routes/signature.routes");
const lol = require("./routes/lol.route");
var items = require("./database-mysql");
const cors = require("cors");
// const bodyParser = require("body-parser")

//Payment
const Stripe = require("stripe");
const PUBLISHABLE_KEY =
  "pk_test_51L6X72Hejc9XlfCikQdaY9J17A4v46tUebq9sgFLimch2Axe4uQivcx5oTwGk3r7m8XMSCdm1OwAaghn4HqAl9Ps0042FYDgM6";
const SECRET_KEY =
  "sk_test_51L6X72Hejc9XlfCijVRAxpDU4QAwtw3PQe4bw92wREDGZQ5l8F79nGTSUx6jk0rWGn51KeBQr73cIqiME05YABwg009CErrqim";

const contractTypeRoutes = require("./routes/contractType.routes");
const contractTypeQuestionsRoutes = require("./routes/contraType.questions.routes");
const login = require("./routes/login");
const con = require("./routes/contract.routes");
const app = express();


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`);
});



app.use(bodyParser.urlencoded({ limit: "50mb" }));

// app.use(express.bodyParser({limit: '500mb'}))
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use("/api/send", usersContractsRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api", reset);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contractType", contractTypeRoutes);
app.use("/api/contractTypeQuestions", contractTypeQuestionsRoutes);
app.use("/api/users", login);
app.use("/api/answers", answersRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/signature", signature);
app.use("/api", contractRoutess);
app.use("/api", lol);

app.get('/', (req, res) => {
  res.send('Welcome To E-Tafakna server')
})



//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });



//"start with nodejs expres?"
app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });
    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
