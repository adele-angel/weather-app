const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(__dirname + "/dist/weather-app"));

// Send all requests to index.html
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/weather-app/index.html"));
});

// default Heroku port
app.listen(process.env.PORT || 5000);
