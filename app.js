//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

let rows = [];
let existingTables = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({limit: '5mb',extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/scheduleDB", {useNewUrlParser: true});

const rowSchema = {
  rowNumber: String,
  rowContent: String
};
const tableSchema = {
  title: {
    type: String,
    required: [true, "Table must include a Title"],
  },
  tablerows:[rowSchema],
  htmlCode: String

};

//get date
let curr = new Date;
let weekDates = [];
let monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i;
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  weekDates.push(day);
}
let thisMonthStr = monthNames[curr.getMonth()];
let thisYearStr = curr.getFullYear();

//define schemas
Table = mongoose.model("Table", tableSchema);
Row = mongoose.model("Row", rowSchema);

app.get("/schedule", function(req, res){
  existingTables = [];
  console.log(existingTables);
  let datesThisWeek = [];
    weekDates.forEach(function(day){
      datesThisWeek.push(day.slice(8));
    });
    //get all existing tables
    Table.find(function(err, foundTables){
      if(err){
        console.log(err);
      }
      else{
        foundTables.forEach(function(table){
          //console.log(table.tablerows);

          existingTables.push(table);
        });
        //remove active classes from html headers
        for(let i = 0; i < existingTables.length-1; i++){
          existingTables[i].htmlCode = existingTables[i].htmlCode.replace("active", "");


        }
          res.render("schedule",{datesThisWeek: datesThisWeek, thisMonthStr: thisMonthStr, thisYearStr: thisYearStr, existingTables: existingTables});
      }

    });



});



app.post("/schedule", function(req, res){
    // console.log(req.body.htmlCode);
    //console.log(req.body.r0);
    let tableTitle = req.body.schedule_title //table identifier
    console.log(tableTitle);
    let currentTable = new Table({
      title: tableTitle,
      htmlCode: req.body.htmlCode
    });
    console.log(currentTable.htmlCode);
    let i = 0;
    for(let obj in req.body){
      // console.log(obj);
      // console.log(req.body[obj]);
      if(obj === ("r"+i)){
        let currentRow = new Row ({
          rowNumber: obj,
          rowContent: req.body[obj]
        });
        currentTable.tablerows.push(currentRow);
        // console.log(obj);
        // console.log(req.body[obj]);
        i++;
      }
    }
    Table.countDocuments({title: tableTitle }, function (err, count){
      if(err){
        console.log(err);
      }else if(count <= 0){ //table doesn't exists

        currentTable.save(function(err){
          if(err){
            console.log(err);
          }
        });
        console.log("table created")
      }else{ //table already exists, but needs to be updated
      Table.findOneAndUpdate({title: tableTitle}, {$set:{tablerows: currentTable.tablerows, htmlCode: currentTable.htmlCode}}, function(err, foundTable){
// Table.replaceOne({title: tableTitle}, function(err, foundTable){
          if(err){
            console.log(err); //couldn't find table
          }
          else{
            console.log("table updated")
          }
        });

      }
    });

  res.redirect("/schedule");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
