//Database code that we are testing
let db = require('../database');

//Server code that we are testing
let server = require('../web-application-sql')

let chai = require('chai');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const mysql = require('mysql');
//Create a connection pool with the user details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "anmol",
    password: "1234",
    database: "tutorapp",
    debug: false
});

//Wrapper for all database tests
describe('Database', () => {

    describe('#getAllStudents', () => {
        it('should return all of the students in the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of students is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if (resObj.length > 1) {
                    resObj[0].should.have.property('id');
                    resObj[0].should.have.property('firstname');
                    resObj[0].should.have.property('lastname');
                    resObj[0].should.have.property('email');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.getAllStudents(response);
        });
    });


    describe('#addTutor', () => {
        it('should add a tutor to the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that tutorhas been added to database
                let sql = "SELECT firstname FROM tutor WHERE firstname='" + firstname + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err) { //Check for errors
                        assert.fail(err); //Fail test if this does not work.
                        done(); //End test
                    } else {
                        //Check that tutor has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM tutor WHERE firstname='" + firstname + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err) { //Check for errors
                                assert.fail(err); //Fail test if this does not work.
                                done(); //End test
                            } else {
                                done(); //End test
                            }
                        });
                    }
                });
            };

            //Create random Tutor details
            let firstname = 'Jack';
            let lastname = 'Harris';
            let email = "jack.h@gmail.com";
            let password = "Jack01";
            let picture = "Jack Harris.jpg"

            //Call function to add tutor to database
            db.addTutor(firstname, lastname, email, password, picture, response);
        });
    });

    describe('#addStudents', () => {
        it('should add a student to the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that student has been added to database
                let sql = "SELECT firstname FROM student WHERE firstname='" + firstname + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err) { //Check for errors
                        assert.fail(err); //Fail test if this does not work.
                        done(); //End test
                    } else {
                        //Check that student has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM student WHERE firstname='" + firstname + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err) { //Check for errors
                                assert.fail(err); //Fail test if this does not work.
                                done(); //End test
                            } else {
                                done(); //End test
                            }
                        });
                    }
                });
            };

            //Create random Tutor details
            let firstname = 'Gladys';
            let lastname = 'Perrez';
            let email = "gladys.p@gmail.com";

            //Call function to add tutor to database
            db.addStudent(firstname, lastname, email, response);
        });
    });
});

describe('Web Service', () => {

    //Test of GET request sent to /getTutor
    describe('/GET tutor', () => {
        it('should GET all the student', (done) => {
            chai.request(server)
                .get('/getTutor')
                .end((err, response) => {
                    //Check the status code
                    response.should.have.status(200);

                    //Convert returned JSON to JavaScript object
                    let resObj = JSON.parse(response.text);

                    //Check that an array of student is returned
                    resObj.should.be.a('array');
                    //Check that appropriate properties are returned
                    if (resObj.length > 1) {
                        resObj[0].should.have.property('id');
                        resObj[0].should.have.property('firstname');
                        resObj[0].should.have.property('lastname');
                        resObj[0].should.have.property('email');
                        resObj[0].should.have.property('password');
                        resObj[0].should.have.property('picture');
                    }

                    //End test
                    done();
                });
        });
    });
});