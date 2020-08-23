/********** checking page name ********************/
const pageUrl = window.location.href;                           // getting full url of the page
let pageSplit = pageUrl.split('/');                             // splitting url
let pageName = pageSplit.pop();                                 // getting lat element of the url



/********** For page animation ********************/
new WOW().init();



/********** For homepage slider ********************/
$('#bannerSlider').carousel();
var winWidth = $(window).innerWidth();
$(window).resize(function () {

    if ($(window).innerWidth() < winWidth) {
        $('.carousel-inner>.item>img').css({
            'min-width': winWidth, 'width': winWidth
        });
    }
    else {
        winWidth = $(window).innerWidth();
        $('.carousel-inner>.item>img').css({
            'min-width': '', 'width': ''
        });
    }
});



/********** For hurry up navigation button ********************/
if (pageName == "" || pageName == "index.html" || pageName == "index") {                        // checking page url
    const hurryUpButton = document.querySelector("#hurryUpButton");
    hurryUpButton.addEventListener('click', function () {
        window.location.href = "signup.html";                                                   // redirecting to sign up page on button click
    });
}



/********** For contact us form validation ********************/
if (pageName == "contact.html" || pageName == "contact") {                                      // checking page url
    let contactElement = document.getElementById("contactUsValidation");
    let contactResult = document.getElementById("contactResult");
    if (contactElement.addEventListener) {
        contactElement.addEventListener("submit", main_validator, true);
    } else if (contactResult.attachEvent) {
        contactElement.attachEvent("onsubmit", main_validator);
    }

    function main_validator(e) {                                                                // calling validation function
        e.preventDefault();
        contactResult.innerHTML = "";
        if (checkFullName(e.target[0].value) && checkEmail(e.target[1].value) && checkInput(e.target[2].value)) {
            showOutput(e);
        }
    }
}



/********** For sign up form validation ********************/
if (pageName == "signup.html" || pageName == "signup") {                                        // checking page url
    let contactElement = document.getElementById("signUpValidation");
    let contactResult = document.getElementById("contactResult");
    if (contactElement.addEventListener) {
        contactElement.addEventListener("submit", main_validator_signup, true);
    } else if (contactResult.attachEvent) {
        contactElement.attachEvent("onsubmit", main_validator_signup);
    }

    function main_validator_signup(e) {                                                         // calling validation function
        e.preventDefault();
        contactResult.innerHTML = "";
        if (checkFullName(e.target[0].value) && checkEmail(e.target[1].value) && checkInput(e.target[2].value) && checkInput(e.target[5].value) && checkInput(e.target[6].value) && comparePassword(e.target[2].value, e.target[3].value)) {
            showOutput(e);
        }
    }
}



/********** General validation functions to be used recursively ********************/

function checkFullName(input) {                                                                 // validating name of the user
    let letters = /^[A-Za-z]+$/;
    let message = "";
    let someWrong = false;

    // if name is empty
    if (input == "") {                                                                          
        message += "* Name is Required";
        someWrong = true;
    }

    // if name is invalid
    if (!input.match(letters)) {
        message += "Invalid Name";
        someWrong = true;
    }

    // displaying error message
    if (someWrong) {
        contactResult.classList.add("errorMessage");
        contactResult.append(message);
        return false;
    }
    return true;
}

function checkInput(input) {                                                                    // validating input fields
    let message = "";
    let someWrong = false;

    // if field is empty
    if (input == "") {
        message += "* Required Field(s)";
        someWrong = true;
    }

    // displaying error message
    if (someWrong) {
        contactResult.classList.add("errorMessage");
        contactResult.append(message);
        return false;
    }
    return true;
}

function checkEmail(input) {                                                                    // validating email address of the user
    var reg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    var message = "";
    var someWrong = false;

    // if email is empty
    if (input == "") {
        message += "* Email is Required";
        someWrong = true;
    }

    // if email is not valid
    if (!reg.test(input)) {
        message += "Invalid Email Address";
        someWrong = true;
    }

    // displaying error message
    if (someWrong) {
        contactResult.classList.add("errorMessage");
        contactResult.append(message);
        return false;
    }
    return true;
}

function comparePassword(input1, input2) {                                                          // comparing password and confirm password
    let message = "";
    let someWrong = false;

    // if password or confirm password is empty
    if (input1 == "" || input2 == "") {
        message += "* Required Field(s)";
        someWrong = true;
    }

    // if password is not equal to confirm password
    if (input1 != input2) {
        message += "Password Not Matched";
        someWrong = true;
    }

    // displaying error message
    if (someWrong) {
        contactResult.classList.add("errorMessage");
        contactResult.append(message);
        return false;
    }
    return true;
}

function showOutput(e) {                                                                            // displaying success result
    let arr = new Array();
    let obj = new Object();
    let cntLength = e.target.length - 1;
    for (let i = 0; i < cntLength; i++) {
        obj = { "Title": e.target[i].title, "Value": e.target[i].value };                           // seperating field name and value
        arr.push(obj);
    }
    contactResult.classList.remove("errorMessage");                                                 // removing error class
    contactResult.classList.add("successMessage");                                                  // adding success class
    for (let j = 0; j < arr.length; j++) {
        contactResult.innerHTML += arr[j].Title + ": " + arr[j].Value + '<br/>';                    // adding output to the html
    }
    return true;
}



/********** General validation functions to be used recursively ********************/
if (pageName == "api.html" || pageName == "api") {                                                  // checking page url
    let apiOutput = document.getElementById("apiOutput");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {                                           // matching state
            apiResult(JSON.parse(this.responseText));                                               // calling function to append html       
        }
    };
    xhttp.open("GET", "http://dummy.restapiexample.com/api/v1/employees", true);                    // calling api
    xhttp.send();                                                                                   // getting the result
}

function apiResult(res) {
    let arr = res['data'];
    for (let k = 0; k < arr.length; k++) {
        // adding result to the html page
        apiOutput.innerHTML += "<tr><td>" + arr[k].id + "</td><td>" + arr[k].employee_name +"</td><td>" + arr[k].employee_age + "</td><td> $ " + arr[k].employee_salary + "</td></tr>";
    }   
}
