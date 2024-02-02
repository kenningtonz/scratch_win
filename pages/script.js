let fieldsChecker;

let isMinor = false;

function hasChars(data) {
    let charPatrren = /^[a-zA-Z]+$/;
    if (charPatrren.test(data.field.value)){
        return true
    } else {
        return false
    }
}
function hasNums(data) {
    let phoneNumberPattern = /^\d{3}\d{3}\d{4}$/;
    if (phoneNumberPattern.test(data.field.value)){
        return true
    } else {
        return false
    }
}

function hasCharsNum(data) {
    let charsNumPattern = /^[a-zA-Z0-9\s]+$/;
    if (charsNumPattern.test(data.field.value)){
        return true
    } else {
        return false
    }
}

function hasSpecialChars(data) {
    let specialCharsPattern = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
    if (specialCharsPattern.test(data.field.value)){
        return true
    } else {
        return false
    }
}

function emailChars(data) {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(data.field.value)){
        return true
    } else {
        return false
    }
}

function hasDate(data) {
    let datePattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
    if (datePattern.test(data.field.value)){
        return true
    } else {
        return false
    }
}

function resetErrors() {
    fieldsChecker.forEach(inputField => {
        inputField.error.innerText = "";
    });
}

function formCheck(e) {

    console.log("FORM CHECKED");
    let errorsFound = 0;
    resetErrors();
    e.preventDefault();

    fieldsChecker.forEach(inputField => {
        if (!inputField.checker(inputField)) {
            inputField.error.innerText = inputField.msg;
            errorsFound += 1;
        }
    });

    if (errorsFound > 0) {
        console.log("FAIL");
    } else {
        console.log("PASS");
    }
}


function needsGuardian(){
    if (isMinor == false){
        return true
    }
    else {
        return hasChars()
    }
}

function formInitiator() {
    let fName = document.getElementById('fName');
    let fNameError = document.getElementById('fNameError');
    let lName = document.getElementById('lName');
    let lNameError = document.getElementById('lNameError');
    let address = document.getElementById('st');
    let stError = document.getElementById('stError');
    let postal = document.getElementById('postal');
    let postalError = document.getElementById('postalError');
    let province = document.getElementById('province');
    let provinceError = document.getElementById('provinceError');
    let city = document.getElementById('city');
    let cityError = document.getElementById('cityError');
    let phone = document.getElementById('phone');
    let phoneError = document.getElementById('phoneError');
    let email = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let date = document.getElementById('date');
    let dateError = document.getElementById('dateError');
    let parentName = document.getElementById('parentName');
    let parentError = document.getElementById('parentError');
    let parentEmail = document.getElementById('parentEmail');
    let parentEmailError = document.getElementById('parentEmailError');

    fieldsChecker = [
        { field: fName, checker: hasChars, error: fNameError, msg: "Invalid First Name" },
        { field: lName, checker: hasChars, error: lNameError, msg: "Invalid Last Name" },
        { field: address, checker: hasCharsNum, error: stError, msg: "Invalid Address" },
        { field: postal, checker: hasSpecialChars, error: postalError, msg: "Invalid Postal Code" },
        { field: province, checker: hasChars, error: provinceError, msg: "Invalid Province" },
        { field: city, checker: hasChars, error: cityError, msg: "Invalid City" },
        { field: phone, checker: hasNums, error: phoneError, msg: "Invalid Phone Number" },
        { field: email, checker: emailChars, error: emailError, msg: "Invalid Email" },
        { field: date, checker: hasDate, error: dateError, msg: "Invalid Date" },
        { field: parentName, checker: hasChars, error: parentError, msg: "Invalid Parent's Name" },
        { field: parentEmail, checker: emailChars, error: parentEmailError, msg: "Invalid Email" },
    ];

    const parentInfoFields = document.getElementById('parentInfoFields');

    date.addEventListener('change', function() {
        const dob = new Date(this.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();

        
        if (age < 16) {
            isMinor=true;
            dateError.textContent = ""; 
            parentInfoFields.style.display = 'block'; 
            needsGuardian()
        } else {
            
            parentInfoFields.style.display = 'none'; 
        }
    });


    
    let formSubmit = document.getElementById("formSubmit");
    formSubmit.addEventListener("click", formCheck);
}

document.addEventListener("DOMContentLoaded", function () {
    formInitiator();
});

