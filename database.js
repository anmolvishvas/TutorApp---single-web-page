const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "anmol",
    password: "1234",
    database: "tutorapp",
    debug: false
});

//Gets all tutors
exports.getAllTutor = (response) => {
    //Build query
    let sql = "SELECT * FROM tutor";

    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err) { //Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        } else { //Return results in JSON format 
            response.send(JSON.stringify(result))
        }
    });
};

//Gets all student
exports.getAllStudents = (response) => {
    //Build query
    let sql = "SELECT * FROM student";

    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err) { //Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        } else { //Return results in JSON format 
            response.send(JSON.stringify(result))
        }
    });
};

exports.addTutor = (firstname, lastname, email, password, picture, response) => {
    //Build query
    let sql = "INSERT INTO tutor (firstname, lastname, email, password, picture) VALUES" +
        "('" + firstname + "','" + lastname + "','" + email + "'," +
        "'" + password + "','" + picture + "')";

    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err) { //Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        } else { //Send back result
            response.send("{result: 'Tutor added successfully'}");
        }
    });
};

exports.addStudent = (firstname, lastname, email, response) => {
    //Build query
    let sql = "INSERT INTO student (firstname, lastname, email) VALUES" +
        "('" + firstname + "','" + lastname + "','" + email + "')";

    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err) { //Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        } else { //Send back result
            response.send("{result: 'Student added successfully'}");
        }
    });
};