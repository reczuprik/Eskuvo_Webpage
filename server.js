const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index", {})
});
app.post("/participant", function(req, res) {
  console.log(req.body);
  res.redirect("/");
})
app.post("/music", function(req, res) {
  console.log(req.body.music);
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
