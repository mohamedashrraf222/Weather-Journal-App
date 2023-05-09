// Require Express to run server and routes
const express = require("express");
const path = require("path");
const https = require("https");

// Start up an instance of app
const app = express();

// Initialize the main project folder
app.use(express.static("../website"));

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Setup Server
const port = 4000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

//GET route to return the JS object created.
app.get("/data", (req, res) => {
  res.send(projectData);
});

//GET route to return our main page
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../website/index.html"));
});

// this is a post route to recive data from the client side and store it in projectData and log it
app.post("/data", (req, res) => {
  let data = "";
  https.get(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&zip=${req.body.value}&appid=85b904827b7830b3bedd2ab3141a9146`,
    (response) => {
      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        res.send(data);
      });
    }
  );
});
