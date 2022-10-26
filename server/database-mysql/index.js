var mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: "cp1256",
});

connection.connect((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});
module.exports = connection;
