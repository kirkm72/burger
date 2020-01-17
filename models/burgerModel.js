var orm = require("../config/orm.js"); // Import the ORM

var burgers = {
  select: function(cb) { // essentially a "search all"
    orm.select("*", "burgers", function(res) { 
      cb(res);
    });
  },

  insert: function(tableInput, info, cb) {
    orm.insert("burgers", info, function(res) {
      cb(res);
    });
  },

  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },

  delete: function(whichOne, cb) {
    orm.delete(whichOne, function(res) {
      cb(res);
    });
  }

};

module.exports = burgers; // Export functions for the controller burgerController.js