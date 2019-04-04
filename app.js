//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

let rows = [];
let existingTables = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(express.static("public"));

//pass current logged in user to all routes


app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/scheduleDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);


const userSchema = new mongoose.Schema({
  name: String,
  employeeID: String,
  phone: String
}); //empty, passport adds username password, and salt
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});
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

app.route("/home")
.get(isLoggedIn, function(req, res){


  let datesThisWeek = [];
  let workingThisWeek = [];
    weekDates.forEach(function(day){
      datesThisWeek.push(day.slice(8));
    });
  // let weekTableTitle = thisMonthStr + " " + thisYearStr + ": " + datesThisWeek[0] + "-" + datesThisWeek[6] + " ";
   let weekTableTitle = thisMonthStr + " " + thisYearStr + ": " + "02" + "-" + "08" + " ";
   console.log(weekTableTitle);
   Table.findOne({title: weekTableTitle},function(err, foundTable){
     if(err){
        console.log(err);
     }else{
       console.log(foundTable.title);
       let tableRows = foundTable.tablerows;
       for(let i = 1; i < tableRows.length; i++){
         console.log(tableRows[i].rowContent.slice(0,4));

          User.findOne({employeeID: tableRows[i].rowContent.slice(0,4)}, function(err, foundEmployee){
            if(err){
              console.log(err);
            }else if(foundEmployee != null){
               workingThisWeek.push(foundEmployee.name);
            }
            if(i >= (tableRows.length-1)){
                   res.render("home", {workingThisWeek: workingThisWeek});
            }
          });
       }
     }


   });

});

app.route("/login")
.get(function(req, res){
  res.render("login");
})
.post(function(req, res) {
      const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, function(err) {
        if (err) {
          console.log(err);
          console.log("error happened in login")
        } else {
          passport.authenticate("local")(req, res, function() {
              res.redirect("/home");

            });
          }
        });


    });

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/login");
});


app.route("/account")
.get(isLoggedIn,function(req, res){
  res.render("account");
});

app.route("/register")
.get(function(req, res){
  res.render("register");
})
.post(function(req, res) {
  User.register({
      username: req.body.username,
      name: req.body.firstName + " " + req.body.lastName,
      employeeID: req.body.employeeID,
      phone: req.body.phone

  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/home");
      });
    }
  });
});

app.post("/schedule", isLoggedIn, function(req, res){
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

app.route("/calendar")
.get(isLoggedIn, function(req, res){
  res.render("calendar");
});

app.route("/arcade")
.get(isLoggedIn, function(req, res){
  res.render("arcade");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
