var express = require("express");
var parser = require("body-parser");
var hbs = require("express-handlebars");
var mongoose = require("./db/connection");

var app = express();

var Compliment = mongoose.model("Compliment");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.get("/*", function(req, res){
  res.render("compliments");
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
