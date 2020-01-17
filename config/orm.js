var connection = require("./connection.js"); //use this connection
var orm = { // Object for all our SQL statement functions.
  select: function (whatToSelect, tableInput, cb) {
    // var queryString = "SELECT * FROM " + tableInput + ";";
    var queryString = "SELECT ?? FROM ??";
    connection.query(queryString, [whatToSelect, tableInput], function (err, result) {
      if (err) {
        throw err;
      }
      console.log("Inside ORM select operation. Result: ", result);
      cb(result);
    });
  },

  insert: function (tableInput, info, cb) {
    // use the code functions above to substitute "?" for provided values pass in
    var queryString = `INSERT INTO burgers(burgerName, devoured) VALUES (?, ?);`;

    //console.log("inside orm insert" + queryString + " colname: " + colNames + " valcol:" + valOfCol);
    connection.query(queryString, info, function (err, result) {
      if (err) {
        console.log("ORM insert error ", queryString);
        throw err;
      }
      cb(result);
      console.log("Inside ORM insert  result: ", result);
    });
  },


  update: function (tableInput, objColVals, whichToUpdate, cb) { //example of objColVals would be {burgerName: Baconburger, devoured: true}
    var queryString = "UPDATE burgers SET devoured = true WHERE " + whichToUpdate;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
      console.log("inside ORM update ", result);
    });
  },

  delete: function (whichToDelete, cb) {
    var queryString = "DELETE FROM burgers " + "WHERE " + whichToDelete;
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      console.log("inside ORM Delete ", result);
      cb(result);
    });
  }
};

module.exports = orm; // Export the orm object for the model (burger.js).