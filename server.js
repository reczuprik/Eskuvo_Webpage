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

app.get("/", function (req, res) {
  res.render("home", {})
});

app.post("/", function(req, res) {
  const itemName = req.body;

  res.redirect("/");
});

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})
