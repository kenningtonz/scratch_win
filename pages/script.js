let fieldsChecker;
let fieldsSecretOpen = false;
let isMinor = false;

function charReg(data) {
    let charReg = /^[a-zA-Z]+$/;
    if (charReg.test(data.field.value)) {
        return true
    } else {
        return false
    }
}
function phoneReg(data) {
    let phoneNumberPattern = /^[(]?([0-9]{3})[)]?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNumberPattern.test(data.field.value)) {
        return true
    } else {
        return false
    }
}

function passwordCheck(data) {
    let passwordPattern = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    //at least one number, one lowercase and one uppercase letter
    //at least six characters
    // has a special character
    if (passwordPattern.test(data.field.value)) {
        return true
    } else {
        return false
    }

}

function hasCharsNum(data) {
    let charsNumPattern = /^[a-zA-Z0-9\s]+$/;
    if (charsNumPattern.test(data.field.value)) {
        return true
    } else {
        return false
    }
}

function postalReg(data) {
    let postalReg = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    if (postalReg.test(data.field.value)) {
        return true
    } else {
        return false
    }
}

function emailReg(data) {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(data.field.value)) {
        return true
    } else {
        return false
    }
}

function hasDate(data) {
    let datePattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
    if (datePattern.test(data.field.value)) {
        return true
    } else {
        return false
    }
}

function secret(data) {
    let secretPattern = /^(001100010010011110100001101101110011)$/;
    if (secretPattern.test(data.field.value) && fieldsSecretOpen == false) {
        window.open("https://www.youtube.com/watch?v=0Whn0YzNG4s", "_blank")
        fieldsSecretOpen = true;
    }
}


function resetErrors() {
    fieldsChecker.forEach(inputField => {
        inputField.error.innerText = "";
    });
    fieldsCheckerIsMinor.forEach(inputField => {
        inputField.error.innerText = "";
    });

}

function formCheck(e) {
    e.preventDefault();

    console.log("FORM CHECKED");
    let errorsFound = 0;
    resetErrors();

    let rulesCheckbox = document.getElementById('rules');
    let rulesCheckboxError = document.getElementById('checkboxError');

    if (!rulesCheckbox.checked) {
        rulesCheckboxError.innerText = "*Please consent to the rules and regulations.";
        errorsFound += 1;
    } else {
        rulesCheckboxError.innerText = "";
    }

    if (isMinor == true) {
        fieldsCheckerIsMinor.forEach(inputField => {
            if (!inputField.checker(inputField)) {
                inputField.error.innerText = inputField.msg;
                errorsFound += 1;
            }
        });
    }

    fieldsChecker.forEach(inputField => {
        secret(inputField);
        if (!inputField.checker(inputField)) {
            inputField.error.innerText = inputField.msg;
            errorsFound += 1;
        }
    });

    if (errorsFound > 0) {
        console.log("FAIL");
    } else {
        saveFormData(fieldsChecker);
        console.log(formData);
        console.log("PASS");
        successValues();
    }

}

function successValues() {
    const mySuccess = document.getElementById("success");
    const parentInfo = document.getElementById("parentInfo");
    let successFName = document.getElementById("successName");
    let dob = document.getElementById("birth");

    let emailA = document.getElementById("emailF");
    let phoneNum = document.getElementById("phoneF");
    let street = document.getElementById("street");
    let cityF = document.getElementById("cityF");
    let provinceF = document.getElementById("provinceF");
    let postalF = document.getElementById("postalF");
    let gFirst = document.getElementById("gFirst");
    let gLast = document.getElementById("gLast");
    let gEmail = document.getElementById("gEmail");
    let gNum = document.getElementById("gNum");


    if (isMinor == true) {
        parentInfo.style.display = 'block';
        gFirst.innerText = formData.GuardianNameFirst;
        gLast.innerText = formData.GuardianNameLast;
        gEmail.innerText = formData.parentEmail;
        gNum.innerText = formData.GuardianNumber;
    }

    successFName.innerText = `${formData.fName} ${formData.lName}`;
    dob.innerText = formData.date;
    emailA.innerText = formData.email;
    phoneNum.innerText = formData.phone;
    street.innerText = formData.address;
    cityF.innerText = formData.city;
    postalF.innerText = formData.postal;
    provinceF.innerText = formData.province;

    mySuccess.style.display = 'block';
    console.log("passssss");
}


function needsGuardian() {
    if (isMinor == false) {
        return true
    }
    else {
        return hasChars();
    }
}

class FormData {
    constructor(fName, lName, address, postal, province, city, phone, email, date, password) {
        this.fName = fName;
        this.lName = lName;
        this.address = address;
        this.postal = postal;
        this.province = province;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.date = date;
    }

    setMinorFields(GuardianNameFirst, GuardianNameLast, parentEmail, GuardianNumber) {
        this.isMinor = true;
        this.GuardianNameFirst = GuardianNameFirst;
        this.GuardianNameLast = GuardianNameLast;
        this.parentEmail = parentEmail;
        this.GuardianNumber = GuardianNumber;

    }

}


let formData = {}

function saveFormData(fieldsChecker) {
    formData = (new FormData(fieldsChecker[0].field.value, fieldsChecker[1].field.value, fieldsChecker[2].field.value, fieldsChecker[3].field.value, fieldsChecker[4].field.value, fieldsChecker[5].field.value, fieldsChecker[6].field.value, fieldsChecker[7].field.value, fieldsChecker[8].field.value, fieldsChecker[9].field.value));
    if (isMinor) {
        formData.setMinorFields(fieldsCheckerIsMinor[0].field.value, fieldsCheckerIsMinor[1].field.value, fieldsCheckerIsMinor[2].field.value, fieldsCheckerIsMinor[3].field.value)
    }
}

// class FieldChecker{
//     constructor(field, checker, error, msg){
//         this.field = field;
//         this.checker = checker;
//         this.error = error;
//         this.msg = msg;
//     }
// }

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
    let password = document.getElementById('password');
    let passwordError = document.getElementById('passwordError');
    let emailError = document.getElementById('emailError');
    let date = document.getElementById('date');
    let dateError = document.getElementById('dateError');


    let GuardianNameFirst = document.getElementById('GfName');
    let GfNameError = document.getElementById('GfNameError');

    let GuardianNameLast = document.getElementById('GlName');
    let GlNameError = document.getElementById('GlNameError');


    let GuardianNumber = document.getElementById('GpNumber');
    let GpNumberError = document.getElementById('GpNumberError');

    let parentEmail = document.getElementById('parentEmail');
    let parentEmailError = document.getElementById('parentEmailError');

    fieldsChecker = [
        { field: fName, checker: charReg, error: fNameError, msg: "*Please enter a valid name." },
        { field: lName, checker: charReg, error: lNameError, msg: "*Please enter a valid name." },
        { field: address, checker: hasCharsNum, error: stError, msg: "*Invalid Address" },
        { field: postal, checker: postalReg, error: postalError, msg: "*Invalid Postal Code" },
        { field: province, checker: charReg, error: provinceError, msg: "*Invalid Province" },
        { field: city, checker: charReg, error: cityError, msg: "*Invalid City" },
        { field: phone, checker: phoneReg, error: phoneError, msg: "*The phone number you entered is not in the correct format.use only numbers." },
        { field: email, checker: emailReg, error: emailError, msg: "*Please provide a valid email address." },
        { field: date, checker: hasDate, error: dateError, msg: "*Invalid Date" },
        { field: password, checker: passwordCheck, error: passwordError, msg: "*Password must contain at least one number, one uppercase and lowercase letter, and at least 6 or more characters." }
    ];

    fieldsCheckerIsMinor = [
        { field: GuardianNameFirst, checker: charReg, error: GfNameError, msg: "*Invalid Name" },
        { field: GuardianNameLast, checker: charReg, error: GlNameError, msg: "*Invalid Name" },
        { field: parentEmail, checker: emailReg, error: parentEmailError, msg: "*Invalid Email" },
        { field: GuardianNumber, checker: phoneReg, error: GpNumberError, msg: "*Invalid Phone Number" },
    ]


    const parentInfoFields = document.getElementById('parentInfoFields');

    date.addEventListener('change', function () {
        const dob = new Date(this.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();

        if (age < 16) {
            isMinor = true;
            dateError.textContent = "";
            parentInfoFields.style.display = 'block';

        } else {
            isMinor = false;
            parentInfoFields.style.display = 'none';
        }
    });


    let formSubmit = document.getElementById("formSubmit");
    formSubmit.addEventListener("click", formCheck);

}

document.addEventListener("DOMContentLoaded", function () {
    formInitiator();
});



let rulesBox = document.getElementById('rulesBox');
rulesBox.addEventListener('scroll', () => {
    let rules = document.getElementById('rules');
    let rulesLabel = document.getElementById('rulesLabel');

    if (rulesBox.scrollTop + rulesBox.clientHeight >= rulesBox.scrollHeight) {
        rules.classList.remove('disabled');
        rulesLabel.classList.remove('disabled');
    }
});
