const connection = require("./connection.js"); //use this connection
// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) { // Helper function to convert object key/value pairs to SQL syntax
  let arr = [];

  for (let key in ob) {// loop through the keys and push the key/value as a string int arr
    let value = ob[key];   
    if (Object.hasOwnProperty.call(ob, key)) { // check to skip hidden properties
      if (typeof value === "string" && value.indexOf(" ") >= 0) { // if string with spaces, add quotations (Cheese Burger to "Cheese Burger")
        value = "'" + value + "'";
      }
      // changes JSON style to SQL style {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // changes JSON style to SQL style {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  return arr.toString(); //Convert array of strings to a single comma-separated string
}

let orm = { // Object for all our SQL statement functions.
  selectAll: function(tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  createOne: function(table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table;

    // queryString += " (";
    // queryString += cols.toString();
    // queryString += ") ";
    // queryString += "VALUES (";
    // queryString += printQuestionMarks(vals.length);
    // queryString += ") ";
    queryString += ` (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  
  updateOne: function(table, objColVals, condition, cb) { //example of objColVals would be {burgerName: Baconburger, devoured: true}
    var queryString = "UPDATE " + table;

    // queryString += " SET ";
    // queryString += objToSql(objColVals);
    // queryString += " WHERE ";
    // queryString += condition;
    queryString += ` SET ${objToSql(objColVals)} WHERE ${condition}`;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // delete: function(table, condition, cb) {
  //   var queryString = "DELETE FROM " + table;
  //   queryString += " WHERE ";
  //   queryString += condition;

  //   connection.query(queryString, function(err, result) {
  //     if (err) {
  //       throw err;
  //     }

  //     cb(result);
  //   });
  // }
};

module.exports = orm; // Export the orm object for the model (burger.js).