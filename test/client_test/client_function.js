// function to check if there's any logged in user
export function checkLoginUser(){
    let loggedintutor = localStorage.getItem("tutor");
    return loggedintutor;
}