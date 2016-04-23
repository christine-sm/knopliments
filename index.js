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

app.get("/api/compliments", function(req, res){
  Compliment.find({}).then(function(compliments){
    res.json(compliments);
  });
});

app.get("/api/compliments/:compliment", function(req, res){
  Compliment.findOne({compliment: req.params.compliment}).then(function(compliment){
    res.json(compliment);
  });
});

app.post("/api/compliments", function(req, res){
  Compliment.create(req.body.compliment).then(function(compliment){
    res.json(compliment);
  });
});

app.delete("/api/compliments/:compliment", function(req, res){
  Compliment.findOneAndRemove({compliment: req.params.compliment}).then(function(){
    res.json({success: true});
  });
});

app.put("/api/compliments/:compliment", function(req, res){
  Compliment.findOneAndUpdate({compliment: req.params.compliment}, req.body.compliment, {new: true}).then(function(compliment){
    res.json(compliment);
  });
});

app.get("/*", function(req, res){
  res.render("compliments");
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
