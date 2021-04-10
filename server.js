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
  name: String,
  date: Date

});
const Music = mongoose.model("Music", musicsSchema);

// participant schema
const participantSchema = new mongoose.Schema({
  name: String,
  present: String,
  email: String,
  follower: String,
  notes: String,
  updated: { type: Date, default: Date.now }

});
const Participant = mongoose.model("Participant", participantSchema);
// #################

app.get("/", function(req, res) {
  res.render("index", {visibility:"hidden",height:"0", text:"" });

});
app.post("/participant", function(req, res) {

  const participant = req.body.ParticipantName;
  const bethere = req.body.there;
  const emailAddress = req.body.ParticipantEmail;
  const followers = req.body.ParticipantFollowers;
  const note = req.body.ParticipantNote;
  const currentDate= new Date;
  const newParticipant = new Participant ({
    name: participant,
    present: bethere,
    email: emailAddress,
    follower: followers,
    notes: note,
    updated: currentDate
  });
  
  Participant.findOne({ name: participant }, function(err, found){
      if (err){
        console.log("MONGOd Error");
      }else
      if (found){
        console.log("found");
        Participant.deleteOne({ name: participant }, function(err, found){
          if (err){
            console.log("deletion error");
          }else{
            newParticipant.save(function(err,doc){
              if(err){
                console.log("Saving error");
              }else{
              res.render("index", { visibility:"visible",height:"50px", text:"Visszajelzésed frissítettük"});
              }
          });}

        })
      }else{
        console.log("new member");
        newParticipant.save(function(err,doc){
          if(err){console.log("Saving error");}
        });
        res.render("index", { visibility:"visible",height:"50px", text:"Köszönjük, hogy visszajeleztél."});
      }
  });
})


app.post("/music", function(req, res) {

  const musicrequest = req.body.music;
  const currentDate= new Date;
  if (musicrequest===""){
    console.log("request is empty");
  }else{
    const newMusic = new Music({
      name: musicrequest,
      date: currentDate
    });
    newMusic.save();
  }
  res.render("index", { visibility:"visible",height:"50px", text:"Kérésédet továbbítjuk DJ-nk felé." });

})
app.get("/*", function(req, res) {
  res.redirect("/");
})


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
