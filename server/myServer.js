
// Setup empty JS object to act as endpoint for all routes
let projectData = { };

// Require Express to run server and routes
const express = require('express');
const path = require('path')

// Start up an instance of app
const app = express();

// Initialize the main project folder
app.use(express.static('../website'));


/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Setup Server
const port = 4000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});


//GET route to return the JS object created.
app.get('/data', (req,res)=>{
  res.send(projectData)
})

//GET route to return our main page
app.get('/', (req,res)=>{
  res.sendFile(path.resolve(__dirname , '../website/index.html'))
})


// this is a post route to recive data from the client side and store it in projectData and log it
app.post('/data',(req,res)=>{
  projectData = Object.assign(projectData,req.body)
  res.status(200).json('thanks for posting data');
  console.log(projectData);
})

