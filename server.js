//Dependencies
//=============================================
var cheerio = require("cheerio");
var axios = require("axios");
var logger = require("morgan");
var mongoose = require("mongoose");
var express = require("express");
var exphbs = require("express-handlebars");

//Require all models
var db = require("./models");

//Start dynamic port assign
var PORT = process.env.PORT || 3000;

//Initialize Express
var app = express();

//Start Morgan as Logger
app.use(logger("dev"));

//Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Express Static - Public
app.use(express.static("public"));

//Use the mLab else use localhost for db

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines2";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//extra code which uses createIndexes since unique:true without this line is deprecated
mongoose.set('useCreateIndex', true);

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start Node server
app.listen(PORT, function() {
  console.log("Node Started on Port: " + PORT);
});
