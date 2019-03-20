//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

let rows = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/scheduleDB", {useNewUrlParser: true});

rowSchema = {
  rowNumber: String,
  rowContent: String
};

//get date
let curr = new Date
let weekDates = []
let monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
  weekDates.push(day)
}
let thisMonthStr = monthNames[curr.getMonth()];
let thisYearStr = curr.getFullYear();

Row = mongoose.model("Row", rowSchema);

app.get("/", function(req, res){
  let datesThisWeek = [];
    weekDates.forEach(function(day){
      datesThisWeek.push(day.slice(8));
    });
    res.render("schedule",{datesThisWeek: datesThisWeek, thisMonthStr: thisMonthStr, thisYearStr: thisYearStr});

});



app.post("/", function(req, res){
    //console.log(req.body);
    //console.log(req.body.r0);
    let i = 0;
    for(let obj in req.body){
      if(obj === ("r" + i)){
        let currentRow = new Row ({
          rowNumber: obj,
          rowContent: req.body[obj]
        });
        currentRow.save()
        console.log(obj);
        console.log(req.body[obj]);
      }
      i++;

    }
    res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
