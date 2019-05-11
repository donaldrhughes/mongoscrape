var mongoose = require("mongoose");

//Ref to the Schema constructor
var Schema = mongoose.Schema;

//new UserSchema obj

var ArticleSchema = new Schema({
   //unique: true --disallows duplicates
  aText: {
    type: String,
    required: true,
 
    unique : true
  },

  aUrl: {
    type: String,
    required: false,
    unique : true
  },
  aSummary: {
    type: String,
    required: true,
    unique : true
  },
  date: {
    type: Date,
    default: Date.now
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note",
    notes: ""
    
  }
  
});


var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;