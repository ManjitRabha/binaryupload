const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
require("dotenv").config();
const mongoURI = process.env.MONGO_DB;

// Import Routes from routes folder
const indexRoute = require("./routes/index");

// setup body-parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Serving Public folder
app.use(express.static("public"));
app.use(express.static(path.join(__dirname)));

// view folder/engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MonogDb connection
// MONGODB setup
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database has been connected");
});

// use actual route
app.use("/", indexRoute);

//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("APP RUNNING"));
