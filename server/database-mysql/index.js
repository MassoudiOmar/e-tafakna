var mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config()

var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});

connection.connect((err, success) => {
  err ? console.log("connection failed", err) : console.log("Database connected successfully")
})
module.exports = connection;