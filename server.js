let express = require("express");

let PORT = process.env.PORT || 3000;

let app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public")); // static files are in "public" folder

// Parse application body as JSON
app.use(express.urlencoded({ extended: true })); // allowing express to encode and parse for me
app.use(express.json()); // allowing express to encode and parse for me

// Set Handlebars.
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" })); // engine generates the view... this case is handlebars
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
let routes = require("./controllers/burgerController.js");

app.use(routes); // use the router named "routes" from line 21


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() { //initializing the EXPRESS server
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});