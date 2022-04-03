window.onload = init;

// declaring variables
let userArr;
let detailDiv = document.getElementById('tutorDisplay');
let studentData = document.getElementById('studentData');
let AddSubjectLevel = document.getElementById('detailsStudentLevel');
let initialForm = document.getElementById('initialForm');
let initialForm2 = document.getElementById('initialForm2');
let AddGrades = document.getElementById('detailsStudentGrades');


// init function
function init() {
    loginPage = document.getElementById("loginSection");
    tutorRegistrationPage = document.getElementById("RegistrationSection");
    homePage = document.getElementById("HomeSection");
    studentRegistrationPage = document.getElementById("RegisterStudentSection");
    viewStudentDataPage = document.getElementById("ViewStudentSection");
    addSubjectAndLevel = document.getElementById("AddSubjectSection");
    addGrades = document.getElementById("AddGradesSection");

    // checking if tutor have logged in
    if (localStorage.tutor == undefined || localStorage.tutor == "") {
        loadLoginPage();
    } else {
        loadHomePage();
    }
}

// function to load login page
function loadLoginPage() {
    loginPage.style.display = "block";
    tutorRegistrationPage.style.display = "none";
    homePage.style.display = "none";
    studentRegistrationPage.style.display = "none";
    viewStudentDataPage.style.display = "none";
    addSubjectAndLevel.style.display = "none";
    addGrades.style.display = "none";
}

// function to load registration page
function loadTutorRegistrationPage() {
    loginPage.style.display = "none";
    tutorRegistrationPage.style.display = "block";
    homePage.style.display = "none";
    studentRegistrationPage.style.display = "none";
    viewStudentDataPage.style.display = "none";
    addSubjectAndLevel.style.display = "none";
    addGrades.style.display = "none";
}

// function to load home page
function loadHomePage() {
    loginPage.style.display = "none";
    tutorRegistrationPage.style.display = "none";
    homePage.style.display = "block";
    studentRegistrationPage.style.display = "none";
    viewStudentDataPage.style.display = "none";
    addSubjectAndLevel.style.display = "none";
    addGrades.style.display = "none";
    // fetching the tutor email from the localstorage
    let tutorEmail = localStorage.getItem('tutor');
    // calling load tutor details function
    LoadTutorDetails(tutorEmail);
}

// function to load student registration  page
function loadStudentRegistrationPage() {
    loginPage.style.display = "none";
    tutorRegistrationPage.style.display = "none";
    homePage.style.display = "none";
    studentRegistrationPage.style.display = "block";
    viewStudentDataPage.style.display = "none";
    addSubjectAndLevel.style.display = "none";
    addGrades.style.display = "none";
}

// function to load view student data page
function loadViewStudentDataPage() {
    loginPage.style.display = "none";
    tutorRegistrationPage.style.display = "none";
    homePage.style.display = "none";
    studentRegistrationPage.style.display = "none";
    viewStudentDataPage.style.display = "block";
    addSubjectAndLevel.style.display = "none";
    addGrades.style.display = "none";
}

// function to load add subject and level page
function loadAddSubjectAndLevelPage() {
    loginPage.style.display = "none";
    tutorRegistrationPage.style.display = "none";
    homePage.style.display = "none";
    studentRegistrationPage.style.display = "none";
    viewStudentDataPage.style.display = "none";
    addSubjectAndLevel.style.display = "block";
    addGrades.style.display = "none";
}

// function to add grades page
function loadAddGradesPage() {
    loginPage.style.display = "none";
    tutorRegistrationPage.style.display = "none";
    homePage.style.display = "none";
    studentRegistrationPage.style.display = "none";
    viewStudentDataPage.style.display = "none";
    addSubjectAndLevel.style.display = "none";
    addGrades.style.display = "block";
}

// function to logout 
function logout() {
    // deleting all the data stored into localstorage
    localStorage.clear();
    // calling login page function
    loadLoginPage();
    location.reload();
}

// function to login tutor
function loginTutor() {
    // performing a new request
    let xhttp = new XMLHttpRequest();

    // fetching data from the input fields
    let userMail = document.getElementById('tutormail').value;
    let userPass = document.getElementById('tutorpass').value;

    // checking of input fields are empty
    if (userMail == "" || userPass == "") {
        alert("Fill up all fields");
        return;
    }

    // creating a tutor object
    let tutorObj = {
        email: userMail,
        pass: userPass
    };

    //fetching the request answer from the server
    xhttp.onreadystatechange = function () {
        // checking if status is OK
        if (this.readyState == 4 && this.status == 200) {
            // if response is success
            if (xhttp.responseText == "success") {
                console.log("login successful");
                //Store tutor mail into localstorage
                localStorage.tutor = userMail;
                // calling load home page function
                loadHomePage();
            } else {
                alert("Incorrect email/password");
            }
        } else {}
    };

    // opening the request in POST mode 
    xhttp.open("POST", "/loggedintutor", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // sending request 
    xhttp.send(JSON.stringify(tutorObj));
}

// function to register tutor
function registerTutor() {
    // performing new requests
    let xhttp = new XMLHttpRequest();
    let httpReq = new XMLHttpRequest();

    // fetching values from inputs
    let userFirstName = document.getElementsByName('fname')[0].value;
    let userLastName = document.getElementsByName('lname')[0].value;
    let userEmail = document.getElementsByName('email')[0].value;
    let userPassword = document.getElementsByName('password')[0].value;
    let userPicture = document.getElementById('img').value;
    let fileArray = document.getElementById("img").files;

    // checking if inputs are empty
    if (userFirstName == "" ||
        userLastName == "" ||
        userEmail == "" ||
        userPassword == "") {
        alert("Fill up all fields");
        event.preventDefault();
        return;
    }
    // checking if a file was selected 
    if (fileArray.length !== 1) {
        alert("Please select file to upload.");
        event.preventDefault();
        return;
    }

    //Put file inside FormData object
    const formData = new FormData();
    formData.append('myFile', fileArray[0]);

    // taking the file name
    userPicture = document.getElementById('img').files[0].name;

    // creating a tutor object
    let tutorObj = {
        firstname: userFirstName,
        lastname: userLastName,
        email: userEmail,
        password: userPassword,
        picture: userPicture
    };

    //Set up HTTP Request
    httpReq.onload = () => {
        let response = JSON.parse(httpReq.responseText);
        if ("error" in response) //Error from server
            serverResponse.innerHTML = response.error;
        else
            serverResponse.innerHTML = "File uploaded successfully";
    };
    //Set up HTTP Request
    xhttp.onreadystatechange = function () {
        // checking request status
        if (this.readyState == 4 && this.status == 200) {
            // if response is success
            if (xhttp.responseText == "success") {
                alert("User added successfully, redirecting to login");
                setTimeout(loadLoginPage, 2000);
            } else {
                alert("User already exist please login");
                setTimeout(loadLoginPage, 2000);
            }
        } else {}
    };

    //Send off message to upload file
    httpReq.open('POST', '/upload');
    httpReq.send(formData);
    //Send off message to store tutor details
    xhttp.open("POST", "/registeredtutor", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(tutorObj));
}

// function to register tutor
function registerStudent() {
    // performing new request
    let xhttp = new XMLHttpRequest();

    // fetching data from input fields
    let studentFirstName = document.getElementsByName('studentfname')[0].value;
    let studentLastName = document.getElementsByName('studentlname')[0].value;
    let studentEmail = document.getElementsByName('studentEmail')[0].value;

    // checking if input fields are empty
    if (studentFirstName == "" ||
        studentLastName == "" ||
        studentEmail == "") {
        alert("Fill up all fields");
        return;
    }

    // creating tutor object
    let tutorObj = {
        firstname: studentFirstName,
        lastname: studentLastName,
        email: studentEmail
    };

    //Set up HTTP Request
    xhttp.onreadystatechange = function () {
        // checking status of the request
        if (this.readyState == 4 && this.status == 200) {
            // if response is success
            if (xhttp.responseText == "success") {
                alert("Student added successfully, redirecting to home");
                setTimeout(loadHomePage, 2000);
            } else {
                alert("Student already exist");
                setTimeout(loadHomePage, 2000);
            }
        } else {}
    };

    //Send off message to store tutor details
    xhttp.open("POST", "/registeredstudent", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(tutorObj));
}

// function to load tutor details
function LoadTutorDetails(email) {
    // performing request
    let xhttp = new XMLHttpRequest();

    // creating a tutor object
    let tutorObj = {
        tutorEmail: email
    };

    //Set up HTTP Request
    xhttp.onreadystatechange = () => {
        // checking the status of the request
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let userArr = JSON.parse(xhttp.responseText);
            console.log('2', userArr);

            let htmlStr = '<div class="home_tutor home_tutor1">' +
                '<div>';

            for (let key in userArr) {
                htmlStr += '<img src="/assets/' + userArr[key].picture + '" alt="" class="profile_picture">';
                htmlStr += '<div class="TutorDetails"><br><h1>Name: <span>' + userArr[key].firstname + ' ' + userArr[key].lastname + '</span></h1>';
                htmlStr += '</div></div></div>';
            }
            // displaying the tutor details into web page
            detailDiv.innerHTML = htmlStr;
        }
    };

    //Send off message to store tutor details
    xhttp.open("POST", "/tutorDetails", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(tutorObj));
}

// function to load student details 
function loadStudentDetails() {
    // perform new request
    let xhttp = new XMLHttpRequest();

    // fetching surname from input field
    let user = document.getElementById('surname').value;

    // checking if input field is not empty
    if (user == "") {
        alert("Enter surname");
        return;
    }

    // creating student object
    let studentObj = {
        lastname: user
    };

    //Set up HTTP Request
    xhttp.onreadystatechange = function () {
        // checking request status
        if (this.readyState == 4 && this.status == 200) {
            // if response is invalid
            if (xhttp.responseText == "invalid") {
                alert("Student with this surname doesn't exist");
            } else {
                console.log("Student Found");
                let studentArr = JSON.parse(xhttp.responseText);

                let htmlStr = '<div class="home">' +
                    '<div class="display_items display_item">' +
                    '<div class="details">';

                for (let key in studentArr) {
                    htmlStr += 'FirstName: <span>' + studentArr[key].firstname + '</span> <hr>';
                    if (studentArr[key].level == 0) {
                        htmlStr += 'Level:<span> Student level not updated yet</span><hr>';
                    } else {
                        htmlStr += 'Level:<span>' + studentArr[key].level + '</span><hr>';
                    }
                    if (studentArr[key].subject == '') {
                        htmlStr += 'Subject:<span> No subject assigned to the student </span> <br>';
                    } else {
                        htmlStr += 'Subject:<span>' + studentArr[key].subject + '</span> <br>';
                        htmlStr += 'Grades:<span>' + studentArr[key].grades + '</span><hr>';
                    }
                    htmlStr += '</div></div></div>';
                }

                studentData.innerHTML = htmlStr;
            }
        } else {}
    };

    //Send off message to store student details
    xhttp.open("POST", "/studentDetails", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(studentObj));
}

// function to load student subject
function loadStudentSubject() {
    // perform new request
    let xhttp = new XMLHttpRequest();

    // fetching data from input
    let user = document.getElementById('studentSurname').value;

    // checking if input is empty
    if (user == "") {
        alert("Enter surname");
        return;
    }

    // creating student object
    let studentObj = {
        lastname: user
    };

    //Set up HTTP Request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (xhttp.responseText == "invalid") {
                alert("Student with this surname doesn't exist");

            } else {
                console.log("Student Found");
                initialForm.style.display = 'none';
                let studentArr = JSON.parse(xhttp.responseText);

                let htmlStr = '<form>';

                for (let key in studentArr) {
                    htmlStr += '<div class="user-box">' +
                        '<input type="text" name="" required="" id="studentLevel" value="' + studentArr[key].level + '">' +
                        '<label>Level</label>' +
                        '</div>';

                    htmlStr += '<div class="user-box">' +
                        '<input type="text" name="" required="" id="studentSubject" value="' + studentArr[key].subject + '">' +
                        '<label>Subject</label>' +
                        '</div>';

                    htmlStr += '<a onclick="studentaddsudject()"> Done </a>';
                    htmlStr += '</form>';
                }
                AddSubjectLevel.innerHTML = htmlStr;
            }
        } else {}
    };

    //Send off message to store student details
    xhttp.open("POST", "/studentDetails", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(studentObj));
}

// function to add subject
function studentaddsudject() {
    // perform new request
    let xhttp = new XMLHttpRequest();

    // fetching data from inputs
    let lastname = document.getElementById('studentSurname').value;
    let level = document.getElementById('studentLevel').value;
    let subject = document.getElementById('studentSubject').value;

    // creating student object
    let studentObj = {
        lastname: lastname,
        level: level,
        subject: subject
    };
    //Set up HTTP Request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "success") {
                alert("Info successfully updated");
                setTimeout(loadHomePage, 2000)

            } else {
                alert("error try again");

            }
        } else {}
    };
    //Send off message to store student details
    xhttp.open("POST", "/updatestudent", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(studentObj));
}

// function to student data
function StudentData() {
    // Perform  new request
    let xhttp = new XMLHttpRequest();

    // fetching data from input field
    let user = document.getElementById('SurnameStudent').value;

    // checking if user is empty
    if (user == "") {
        alert("Enter surname");
        return;
    }

    // creating student object
    let studentObj = {
        lastname: user
    };
    //Set up HTTP Request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "invalid") {
                alert("Student with this surname doesn't exist");

            } else {
                console.log("Student Found");
                initialForm2.style.display = 'none';
                let studentArr = JSON.parse(xhttp.responseText);

                let htmlStr = '<form class="grade">';

                for (let key in studentArr) {
                    htmlStr += '<p>Level: &nbsp <input type="text" value="' + studentArr[key].level + '" disabled></p>';

                    htmlStr += '<p>Subject: &nbsp <input type="text" class="inputSubject" value="' + studentArr[key].subject + '" disabled>' +
                        '&nbsp Grade: &nbsp <input type="text" class="inputGrade" id="grade" value="' + studentArr[key].grades + '">' +
                        '</p>';

                    htmlStr += '<a onclick="studentaddgrades()"> Done </a>';
                    htmlStr += '</form>';
                }
                AddGrades.innerHTML = htmlStr;
            }
        } else {}
    };
    //Send off message to store student details
    xhttp.open("POST", "/studentDetails", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(studentObj));
}

// function to add grades
function studentaddgrades() {
    // performing new request
    let xhttp = new XMLHttpRequest();

    // fetching data from input
    let lastname = document.getElementById('SurnameStudent').value;
    let grades = document.getElementById('grade').value;

    // creating student object
    let studentObj = {
        lastname: lastname,
        grades: grades
    };
    //Set up HTTP Request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "success") {
                // alert("Info successfully updated");
                setTimeout(loadHomePage, 2000)

            } else {
                alert("error try again");

            }
        } else {}
    };
    //Send off message to store student details
    xhttp.open("POST", "/updatestudentgrade", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(studentObj));
}