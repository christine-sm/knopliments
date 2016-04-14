var mongoose  = require("mongoose");

var PraiseSchema = new mongoose.Schema(
  {
    praise: String
  }
);

var ComplimentSchema = new mongoose.Schema(
  {
    compliment: String,
    photo_url: String,
    comments: [PraiseSchema]
  }
);

mongoose.model("Compliment", ComplimentSchema);
mongoose.model("Praise", PraiseSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URL);
}else{
  mongoose.connect("mongodb://localhost/knopliments");
}

module.exports = mongoose;
