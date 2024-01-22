// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

app.get('/all', (req, res) => {
    res.json(projectData)
})

app.post('/all',
    (req, res) => {
        const newData = req.body;
        projectData.temperature = newData.temperature;
        projectData.date = newData.date;
        projectData.userResponse = newData.userResponse;
        //passed
        //console.log(projectData)
    })