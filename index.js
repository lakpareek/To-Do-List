import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const date = new Date();
let dayt = date.getDate();
let month = date.getMonth();
let day = date.getDay();
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let year = date.getFullYear();

var workList = [];
var homeList = [];

// Middleware to check and clear the arrays if the day has changed
function checkAndClearArrays(req, res, next) {
  const currentDate = new Date();
  if (currentDate.getDate() !== dayt) {
    workList = [];
    homeList = [];
    dayt = currentDate.getDate();
    month = currentDate.getMonth();
    day = currentDate.getDay();
    year = currentDate.getFullYear();
  }
  next();
}

app.use(checkAndClearArrays);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/work", (req, res) => {
  res.render("work.ejs", { dayt, month, day, year, monthnames: months, daynames: days, listItems: workList });
});

app.get("/home", (req, res) => {
  res.render("home.ejs", { dayt, month, day, year, monthnames: months, daynames: days, listItems2: homeList });
});

app.post("/adder", (req, res, next) => {
  var key = Object.keys(req.body)[0];
  var ItemToBeAdded = req.body[key];
  if (key == "newItem") {
    workList.push(ItemToBeAdded);
    res.redirect("/work");
    next();
  } else {
    homeList.push(ItemToBeAdded);
    res.redirect("/home");
    next();
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
