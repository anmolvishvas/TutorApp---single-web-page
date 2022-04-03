//Import the express, body-parser, express-fileupload, mysql, express-session modules
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const expressSession = require('express-session')

// declaring port number
const port = 3000;

//Create a connection pool with the user details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "anmol",
    password: "1234",
    database: "tutorapp",
    debug: false
});

//The express module is a function. When it is executed it returns an app object
const app = express();

let details = [];

//Set up Express to use body-parser with JSON formatted data.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//Set up Express to use file-upload.
app.use(fileUpload());
//Set up express to serve static files from the directory called 'TutorApp'
app.use(express.static('TutorApp'));
//Configure express to use express-session
app.use(
    expressSession({
        secret: "tutorApp",
        cookie: {
            maxAge: 60000
        },
        resave: false,
        saveUninitialized: true
    })
);

//Set up application to handle GET requests 
app.get('/', (req, res) => {
    res.sendFile(_dirname + '/index.html')
});
app.get('/checklogin', checklogin);
app.get('/logout', logout);

//Set up application to handle POST requests
app.post('/', (req, res) => {
    if (req.files) {
        console.log(req.files)
    }
})
app.post('/loggedintutor', LoginTutorPost);
app.post('/registeredtutor', RegisterTutorPost);
app.post('/registeredstudent', RegisterStudentPost);
app.post('/tutorDetails', TutorDetailPost);
app.post('/studentDetails', StudentDataPost);
app.post('/updatestudent', StudentSubjectLevelPost);
app.post('/updatestudentgrade', StudentGradesPost);

//Handle POST requests sent to /upload path
app.post('/upload', function (request, response) {
    //Check to see if a file has been submitted on this path
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send('{"upload": false, "error": "Files missing"}');
    }
    // The name of the input field (i.e. "myFile") is used to retrieve the uploaded file
    let myFile = request.files.myFile;

    //CHECK THAT IT IS AN IMAGE FILE, NOT AN .EXE ETC.
    myFile.mv('./TutorApp/assets/' + myFile.name, function (err) {
        if (err)
            return response.status(500).send('{"filename": "' +
                myFile.name + '", "upload": false, "error": "' +
                JSON.stringify(err) + '"}');

        //Send back confirmation of the upload to the client.
        response.send('{"filename": "' + myFile.name +
            '", "upload": true}');
    });
});

// get login tutor function
async function getLoginTutor(email, password) {
    //Build query
    let sql = "SELECT * FROM tutor WHERE email=" + "'" + email + "' AND password='" + password + "';";

    //Wrap the execution of the query in a promise
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) { //Check for errors
                reject("Error executing query: " + JSON.stringify(err));
            } else { //Resolve promise with results
                resolve(result);
            }
        });
    });
}
// get tutor details function
async function getTutorDetails(email) {
    //Build query
    let sql = "SELECT * FROM tutor WHERE email='" + email + "';";
    //Wrap the execution of the query in a promise
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) {
                reject("Error executing query: " + JSON.stringify(err));
            } else {
                resolve(result);
            }
        });
    });
}

// get student function
async function getStudent(lastname) {
    // build query
    let sql = "SELECT * FROM student WHERE lastname='" + lastname + "';";
    //Wrap the execution of the query in a promise
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) { //Check for errors
                reject("Error executing query: " + JSON.stringify(err));
            } else { //Resolve promise with results
                resolve(result);
            }
        });
    });
}

// GET /checklogin. Checks to see if the user has logged in
function checklogin(request, response) {
    if (!("mail" in request.session))
        response.send('{"login": false}');
    else {
        response.send('{"login":true, "mail": "' +
            request.session.mail + '" }');
    }
}

// logout function
function logout(request, response) {
    //Destroy session.
    request.session.destroy(err => {
        if (err) {
            response.send("{'error':" + JSON.stringify(err) + ")");
        } else {
            response.send("{'login':false}");
        }
    });
}

// login tutor post function
function LoginTutorPost(request, response) {
    //Output the data sent to the server
    let loginTutor = request.body;
    console.log("Data received: " + JSON.stringify(loginTutor));

    //Performing query
    getLoginTutor(loginTutor.email, loginTutor.pass).then(result => {
        loginTutor = (JSON.stringify(result));
        if (loginTutor.length == 2) {
            response.send("invalid");
        } else {
            request.session.mail = loginTutor.email;
            response.send("success");
        }
    }).catch(err => { //Handle the error
        console.error(JSON.stringify(err))
    });
}

// student data post function
function StudentDataPost(request, response) {
    //Output the data sent to the server
    let student = request.body;
    console.log("Data received: " + JSON.stringify(student));

    //Performing query
    getStudent(student.lastname).then(result => {
        student = (JSON.stringify(result));
        console.log(result);
        if (student.length == 2) {
            response.send("invalid");
        } else {
            response.send(student);
        }
    }).catch(err => { //Handle the error
        console.error(JSON.stringify(err))
    });
}

// student data post function
function RegisterTutorPost(request, response) {
    //Output the data sent to the server
    let newTutor = request.body;
    console.log("Data received: " + JSON.stringify(newTutor));

    // build query
    let sql = "INSERT INTO tutor (firstname, lastname, email, password, picture) VALUES" +
        "('" + newTutor.firstname + "','" + newTutor.lastname + "','" + newTutor.email + "','" + newTutor.password + "','" + newTutor.picture + "');"

    //Performing query
    connectionPool.query(sql, (err, result) => {
        if (err) { //Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            console.log("error");
            response.send("error");
        } else {
            console.log("success");
            response.send("success");
        }
    });
}

// register student post function
function RegisterStudentPost(request, response) {
    //Output the data sent to the server
    let newStudent = request.body;
    console.log("Data received: " + JSON.stringify(newStudent));

    // build query
    let sql = "INSERT INTO student (firstname, lastname, email) VALUES" +
        "('" + newStudent.firstname + "','" + newStudent.lastname + "','" + newStudent.email + "');"

    //Performing query
    connectionPool.query(sql, (err, result) => {
        if (err) { //Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            console.log("error");
            response.send("error");
        } else {
            console.log("success");
            response.send("success");
        }
    });
}

// tutor details post function
function TutorDetailPost(request, response) {
    //Output the data sent to the server
    let tutor = request.body;
    console.log("Data received: " + JSON.stringify(tutor));

    //Performing query
    getTutorDetails(tutor.tutorEmail).then(result => {
        details = JSON.stringify(result);
        response.send(details);
    }).catch(err => {
        console.log(JSON.stringify(err));
    });
}

// student subject and level post function
function StudentSubjectLevelPost(request, response) {
    //Output the data sent to the server
    let student = request.body;
    console.log("Data received: " + JSON.stringify(student));

    //Add user to our data structure
    console.log(student.lastname);

    //Build query
    let sql = "UPDATE student SET level= " +
        "'" + student.level + "',subject='" + student.subject + "' WHERE lastname='" + student.lastname + "';";
    //Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err) { //Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            console.log("error");
            response.send("error");
        } else {
            console.log("success");
            response.send("success");
            console.log(result.affectedRows + ' rows updated');
        }
    });
}

// student grades post function
function StudentGradesPost(request, response) {
    //Output the data sent to the server
    let student = request.body;
    console.log("Data received: " + JSON.stringify(student));

    //Add user to our data structure
    console.log(student.lastname);

    //Build query
    let sql = "UPDATE student SET grades= " +
        "'" + student.grades + "' WHERE lastname='" + student.lastname + "';";
    //Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err) { //Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
            console.log("error");
            response.send("error");
        } else {
            console.log("success");
            response.send("success");
            console.log(result.affectedRows + ' rows updated');
        }
    });
}
// server listening
app.listen(port, () => console.log(`Listening on port ${port}`));