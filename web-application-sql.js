//Import the express, body-parser modules
const express = require('express');
const bodyParser = require('body-parser');

//Import database functions
const db = require('./database');

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());

//Set up express to serve static files from the directory called 'TutorApp'
app.use(express.static('TutorApp'));

//Set up application to handle GET requests sent to the customers path
app.get('/getTutor', handleGetRequest);

//Start the app listening on port 3000
app.listen(3000);

//Handles GET requests to our web service
function handleGetRequest(request, response) {
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var pathEnd = pathArray[pathArray.length - 1];

    //If path ends with 'tutor' we return all tutor
    if (pathEnd === 'getTutor') {
        //Call function to return all tutor
        db.getAllTutor(response);
    } else {
        //The path is not recognized. Return an error message
        response.send("{error: 'Path not recognized'}")
    }
}

//Export server for testing
module.exports = app;