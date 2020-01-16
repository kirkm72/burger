let orm = require("../config/orm.js"); // Import the ORM

let burger = {
  all: function(cb) { // essentially a "search all"
    orm.all("burgers", function(res) { 
      cb(res);
    });
  },
  
  create: function(cols, vals, cb) {  // The variables cols and vals are arrays.
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
};

module.exports = burger; // Export functions for the controller burgerController.js