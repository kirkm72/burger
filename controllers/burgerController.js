var express = require("express");
var burger = require("../models/burgerModel.js"); // import burger.js model. This is calling a model. Essentially a database schema.
var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.select(function (data) {
    let hbsObject = { // handlebars object
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject); // handlebars rendering engine
  });
});

router.post("/api/burgers", function (req, res) {
  req.body.devoured = false; //sets initial state to false
  burger.insert("burgers", [req.body.burgerName, req.body.devoured], function (result) {
    res.json({ id: result.insertId }); // Returns ID in JSON format
  });
});

router.put("/api/burgers/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  burger.update(
    { id: req.body.id, devoured: req.body.devoured },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        return res.status(404).end();// If no rows were changed, then the ID must not exist, so 404
      } else {
        res.status(200).end(); //success code
      }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.changedRows == 0) { 
      return res.status(404).end(); // If no rows were changed, then the ID must not exist, so 404
    } else {
      res.status(200).end(); //success code
    }
  });
});

module.exports = router; // Export routes for server.js to use.