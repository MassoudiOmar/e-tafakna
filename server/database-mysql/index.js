var mysql = require("mysql2");
const dotenv = require("dotenv");
const PoolManager  = require("mysql-connection-pool-manager")
dotenv.config();

var connection = mysql.createPool({
  connectionLimit : process.env.CONNECTIONLIMIT || 100,
  host: process.env.MYSQL_HOST || "containers-us-west-24.railway.app",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "4iIpFiFPGAgoGOuZCIh2",
  database: process.env.MYSQL_DATABASE || "railway",
  charset: "cp1256",
  port : process.env.DB_PORT || 7682
});



connection.getConnection((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});
module.exports = connection;






