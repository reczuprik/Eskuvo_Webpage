const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//init mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open",()=> {
    console.log("Mongo DB database connection established successfully");
})


// music schema
const musicsSchema = new mongoose.Schema({
  name: String
});
const Music = mongoose.model("Music", musicsSchema);
// #################



app.get("/", function(req, res) {

  res.render("index", {})

});
app.post("/participant", function(req, res) {
  console.log(req.body);
  const participant = req.body.ParticipantName;
  const bethere = req.body.there;
  const emailAddress = req.body.ParticipantEmail;
  const followers = req.body.ParticipantFollowers;
  const note = req.body.ParticipantNote;



  res.redirect("/");
})
app.post("/music", function(req, res) {

  const musicrequest = req.body.music;
  if (musicrequest===""){
    console.log("request is empty");
  }else{
    const newMusic = new Music({
      name: musicrequest
    });
    newMusic.save();
  }

  res.redirect("/");
})
app.get("/*", function(req, res) {
  res.redirect("/");
})


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
