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
const notifFCM = require("./routes/SendNotifFCM.routes")
const FCM = require('fcm-node')



var items = require("./database-mysql");
const cors = require("cors");
const paginate = require("express-paginate");
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
process.env.NODE_TLS_REJECT_UNAUTHORIZED



app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`);
});

app.use(bodyParser.urlencoded({ limit: "5000mb" }));

// CORRECT (should always work)
// app.use(express.bodyParser({limit: '500mb'}))
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(paginate.middleware(10, 50));

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
app.use("/api/throw",notifFCM)



app.use("/uploads", express.static("./uploads"));
// app.get("/", (req, res) => { //
//   res.send("Welcome To E-Tafakna server");
// });

// const https = require('https')
// const options = {
//   hostname: 'e-tafakna-back.com',
//   port: 443,
//   path: '/',
//   method: 'GET'
// }

// setInterval(()=>{

//     const req = https.request(options, (res) => {
//         console.log(`statusCode: ${res.statusCode}`)
      
//         res.on('data', (d) => {
//           process.stdout.write(d)
//         })
//       })
      
//       req.on('error', (error) => {
//         console.error(error)
//       })
      
//       req.end()
      

// },5000)




