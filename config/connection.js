var mysql = require("mysql");
var connection = mysql.createConnection({ //set connection parameters
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "burgerDB"
});

connection.connect(function(err) { //initiate connection
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection; // Export connection for ORM