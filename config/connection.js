var mysql = require("mysql");

if(process.env.JAWSDB_URL){ // Heroku's JAWS DB
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
} else{
  var connection = mysql.createConnection({ //local DB
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