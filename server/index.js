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
const notifFCM = require("./routes/SendNotifFCM.routes");
const FCM = require("fcm-node");

http = require("http");
NODE_TLS_REJECT_UNAUTHORIZED=0
var items = require("./database-mysql");
const cors = require("cors");
const paginate = require("express-paginate");
// const bodyParser = require("body-parser")
//Paymentddd
const Stripe = require("stripe");
const PUBLISHABLE_KEY =
  "pk_test_51L6X72Hejc9XlfCikQdaY9J17A4v46tUebq9sgFLimch2Axe4uQivcx5oTwGk3r7m8XMSCdm1OwAaghn4HqAl9Ps0042FYDgM6";
const SECRET_KEY =
  "sk_test_51L6X72Hejc9XlfCijVRAxpDU4QAwtw3PQe4bw92wREDGZQ5l8F79nGTSUx6jk0rWGn51KeBQr73cIqiME05YABwg009CErrqim";

const contractTypeRoutes = require("./routes/contractType.routes");
const contractTypeQuestionsRoutes = require("./routes/contraType.questions.routes");
const login = require("./routes/login");
const app = express();

const PORT = process.env.PORT || 3306;

let server = app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`);
});

app.use(bodyParser.urlencoded({ limit: "5000mb" }));

// CORRECT (should always work)::
// app.use(express.bodyParser({limit: '500mb'}))
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use("/api/send", usersContractsRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api", reset);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contractType", contractTypeRoutes);
app.use("/api/contractTypeQuestions", contractTypeQuestionsRoutes);
app.use("/api/userss", login);
app.use("/api/answers", answersRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/signature", signature);
app.use("/api", contractRoutess);
app.use("/api/throw", notifFCM);
app.use("/uploads", express.static("./uploads"));
app.get("/", (req, res) => {
  res.send(`welcome etafakna !`);
});

//abctest

const serverPort = 80;

//server = http.createServer(app),
(WebSocket = require("ws")),
  (websocketServer = new WebSocket.Server({ server: server, path: "/test" }));
//when a websocket connection is established

/*
Create Big array With !Every Index Represent a User If the user has true in his case then  send for refresh 
and change the case to false 
else 
no need to do anything 


*/
let numberOfUsers = 200;

let User = Array(numberOfUsers).fill({
  Notification: false,
  Contracts: false,
});

websocketServer.on("connection", (webSocketClient) => {
  console.log("web Socket Connected");
  webSocketClient.on("open    ", (res) => {
    console.log("Web Socket Connected");
  });

  webSocketClient.on("message", (res) => {
    let Temp = res.toString().split(" ");
    console.log(Temp);
    let index = parseInt(Temp[0]);
    let action = Temp[1];
    if (action == "get") {
      if (User[index]?.Notification) {
        User[index].Notification = false;
        webSocketClient.send("refresh");
      } else {
        webSocketClient.send("Nun");
      }
    } else {
      if (action == "send") {
        User[index].Notification = true;
        User[index].Contracts = true;

        webSocketClient.send("Done");
      } else if (action == "getContract") {
        if (User[index]?.Contracts) {
          User[index].Contracts = false;
          webSocketClient.send("refresh");
        } else {
          webSocketClient.send("Nun");
        }
      }
    }
  });
  webSocketClient.on("close", (res) => {
    console.log("Web Socket Disconnected");
  });

  //send feedback to the incoming connection
});

//start the web server

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
    res.json({ error: e.message });
  }
});
