let fieldsChecker;

let isMinor = false;

function hasChars(data) {
    let charPatrren = /^[a-zA-Z]+$/;
    if (charPatrren.test(data.field.value)) {
        return true
    } else {
        return false
    }
}
function hasNums(data) {
    let phoneNumberPattern = /^\d{3}\d{3}\d{4}$/;
    if (phoneNumberPattern.test(data.field.value)) {
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

function hasSpecialChars(data) {
    let specialCharsPattern = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
    if (specialCharsPattern.test(data.field.value)) {
        return true
    } else {
        return false
    }
}

function emailChars(data) {
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


//funtion sucess
//grab element
// set inner textContent
function successValues() {
    const mySuccess = document.getElementById("success");
    const parentInfo = document.getElementById("parentInfo");
    let successFName =  document.getElementById("successName");
    let dob =  document.getElementById("birth");
    let emailA =  document.getElementById("emailF");
    let phoneNum =  document.getElementById("phoneF");
    let street =  document.getElementById("street");
    let cityF =  document.getElementById("cityF");
    let provinceF =  document.getElementById("provinceF");
    let postalF =  document.getElementById("postalF");
    let gFirst =  document.getElementById("gFirst");
    let gLast =  document.getElementById("gLast");
    let gEmail =  document.getElementById("gEmail");
    let gNum =  document.getElementById("gNum");


    if (isMinor == true) {
        parentInfo.style.display = 'block';
        gFirst.innerText= formData.GuardianNameFirst;
        gLast.innerText= formData.GuardianNameLast;
        gEmail.innerText= formData.parentEmail;
        gNum.innerText= formData.GuardianNumber;
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
    constructor(fName, lName, address, postal, province, city, phone, email, date) {
        this.fName = fName;
        this.lName = lName;
        this.address = address;
        this.postal = postal;
        this.province = province;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.date = date;
    }

    setMinorFields(GuardianNameFirst,GuardianNameLast, parentEmail, GuardianNumber){
        this.isMinor = true;
        this.GuardianNameFirst = GuardianNameFirst;
        this.GuardianNameLast = GuardianNameLast;
        this.parentEmail = parentEmail;
        this.GuardianNumber = GuardianNumber;
    
    }

}


let formData = {}

function saveFormData(fieldsChecker) {
    formData =  (new FormData(fieldsChecker[0].field.value, fieldsChecker[1].field.value, fieldsChecker[2].field.value, fieldsChecker[3].field.value, fieldsChecker[4].field.value, fieldsChecker[5].field.value, fieldsChecker[6].field.value, fieldsChecker[7].field.value , fieldsChecker[8].field.value ));
  if(isMinor){
    formData.setMinorFields(fieldsCheckerIsMinor[0].field.value, fieldsCheckerIsMinor[1].field.value,fieldsCheckerIsMinor[2].field.value,fieldsCheckerIsMinor[3].field.value)
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
        { field: fName, checker: hasChars, error: fNameError, msg: "*Please enter a valid name." },
        { field: lName, checker: hasChars, error: lNameError, msg: "*Please enter a valid name." },
        { field: address, checker: hasCharsNum, error: stError, msg: "*Invalid Address" },
        { field: postal, checker: hasSpecialChars, error: postalError, msg: "*Invalid Postal Code" },
        { field: province, checker: hasChars, error: provinceError, msg: "*Invalid Province" },
        { field: city, checker: hasChars, error: cityError, msg: "*Invalid City" },
        { field: phone, checker: hasNums, error: phoneError, msg: "*The phone number you entered is not in the correct format.use only numbers." },
        { field: email, checker: emailChars, error: emailError, msg: "*The email address you entered is not valid. Please provide a valid email address." },
        { field: date, checker: hasDate, error: dateError, msg: "*Invalid Date" }
    ];

    fieldsCheckerIsMinor = [
        { field: GuardianNameFirst, checker: hasChars, error: GfNameError, msg: "*Invalid Name" },
        { field: GuardianNameLast, checker: hasChars, error: GlNameError, msg: "*Invalid Name" },
        { field: parentEmail, checker: emailChars, error: parentEmailError, msg: "*Invalid Email" },
        { field: GuardianNumber, checker: hasNums, error: GpNumberError, msg: "*Invalid Phone Number" },
    ]


    const parentInfoFields = document.getElementById('parentInfoFields');

    date.addEventListener('change', function () {
        const dob = new Date(this.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        console.log(age);


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
    if (rulesBox.scrollTop + rulesBox.clientHeight >= rulesBox.scrollHeight) {
        rules.classList.remove('disabled');
    }
});
