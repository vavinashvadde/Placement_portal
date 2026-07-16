/*=========================================================
    VALIDATION.JS
    PART 1
    Common Validation Functions
=========================================================*/

"use strict";

/*=========================
    REGULAR EXPRESSIONS
=========================*/

const REGEX = {

    name: /^[A-Za-z ]{3,50}$/,

    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    phone: /^[6-9][0-9]{9}$/,

    password:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/,

    roll:
        /^[A-Za-z0-9-]{5,20}$/,

    company:
        /^[A-Za-z0-9 .,&()-]{2,100}$/

};

/*=========================
    ERROR MESSAGE
=========================*/

function showError(input,message){

    input.classList.add("is-invalid");

    input.classList.remove("is-valid");

    let error = input.nextElementSibling;

    if(error && error.classList.contains("error-message")){

        error.innerText = message;

        return;

    }

    error = document.createElement("small");

    error.className = "error-message";

    error.style.color="red";

    error.style.display="block";

    error.style.marginTop="5px";

    error.innerText=message;

    input.parentNode.appendChild(error);

}

/*=========================
    SUCCESS MESSAGE
=========================*/

function showSuccess(input){

    input.classList.remove("is-invalid");

    input.classList.add("is-valid");

    let error=input.parentNode.querySelector(".error-message");

    if(error){

        error.remove();

    }

}

/*=========================
    REQUIRED FIELD
=========================*/

function validateRequired(input){

    if(input.value.trim()===""){

        showError(input,"This field is required");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    NAME VALIDATION
=========================*/

function validateName(input){

    const value=input.value.trim();

    if(!REGEX.name.test(value)){

        showError(input,"Enter valid name");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    EMAIL VALIDATION
=========================*/

function validateEmail(input){

    const value=input.value.trim();

    if(!REGEX.email.test(value)){

        showError(input,"Invalid Email Address");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    PHONE VALIDATION
=========================*/

function validatePhone(input){

    const value=input.value.trim();

    if(!REGEX.phone.test(value)){

        showError(input,"Enter valid phone number");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    ROLL NUMBER
=========================*/

function validateRoll(input){

    const value=input.value.trim();

    if(!REGEX.roll.test(value)){

        showError(input,"Invalid Roll Number");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    COMPANY NAME
=========================*/

function validateCompany(input){

    const value=input.value.trim();

    if(!REGEX.company.test(value)){

        showError(input,"Invalid Company Name");

        return false;

    }

    showSuccess(input);

    return true;

}
/*=========================================================
    VALIDATION.JS
    PART 2
    Password • Files • CGPA • Salary • URL
=========================================================*/

/*=========================
    PASSWORD VALIDATION
=========================*/

function validatePassword(input){

    const value = input.value.trim();

    if(!REGEX.password.test(value)){

        showError(
            input,
            "Password must contain Uppercase, Lowercase, Number & Special Character"
        );

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    CONFIRM PASSWORD
=========================*/

function validateConfirmPassword(passwordInput,confirmInput){

    if(confirmInput.value.trim()===""){

        showError(confirmInput,"Confirm Password is required");

        return false;

    }

    if(passwordInput.value!==confirmInput.value){

        showError(confirmInput,"Passwords do not match");

        return false;

    }

    showSuccess(confirmInput);

    return true;

}

/*=========================
    CGPA VALIDATION
=========================*/

function validateCGPA(input){

    const value=parseFloat(input.value);

    if(isNaN(value) || value<0 || value>10){

        showError(input,"CGPA should be between 0 and 10");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    PERCENTAGE VALIDATION
=========================*/

function validatePercentage(input){

    const value=parseFloat(input.value);

    if(isNaN(value) || value<0 || value>100){

        showError(input,"Percentage should be between 0 and 100");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    SALARY VALIDATION
=========================*/

function validateSalary(input){

    const value=parseFloat(input.value);

    if(isNaN(value) || value<=0){

        showError(input,"Enter valid salary");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    DATE VALIDATION
=========================*/

function validateDate(input){

    if(input.value===""){

        showError(input,"Select a valid date");

        return false;

    }

    const selected=new Date(input.value);

    if(isNaN(selected.getTime())){

        showError(input,"Invalid date");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    URL VALIDATION
=========================*/

function validateURL(input){

    try{

        new URL(input.value);

        showSuccess(input);

        return true;

    }

    catch(e){

        showError(input,"Invalid URL");

        return false;

    }

}

/*=========================
    FILE SIZE
=========================*/

function validateFileSize(file,maxMB){

    const max=maxMB*1024*1024;

    return file.size<=max;

}

/*=========================
    IMAGE VALIDATION
=========================*/

function validateImage(input){

    if(input.files.length===0){

        showError(input,"Please select an image");

        return false;

    }

    const file=input.files[0];

    const allowed=[
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp"
    ];

    if(!allowed.includes(file.type)){

        showError(input,"Only JPG, PNG and WEBP images are allowed");

        return false;

    }

    if(!validateFileSize(file,2)){

        showError(input,"Image size should be less than 2 MB");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    RESUME VALIDATION
=========================*/

function validateResume(input){

    if(input.files.length===0){

        showError(input,"Please upload resume");

        return false;

    }

    const file=input.files[0];

    const allowed=[
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if(!allowed.includes(file.type)){

        showError(input,"Only PDF or DOC/DOCX files are allowed");

        return false;

    }

    if(!validateFileSize(file,5)){

        showError(input,"Resume size should be less than 5 MB");

        return false;

    }

    showSuccess(input);

    return true;

}

/*=========================
    IMAGE PREVIEW
=========================*/

function previewImage(input,imageId){

    if(input.files && input.files[0]){

        const reader=new FileReader();

        reader.onload=function(e){

            document.getElementById(imageId).src=e.target.result;

        };

        reader.readAsDataURL(input.files[0]);

    }

}
/*=========================================================
    VALIDATION.JS
    PART 3
    Form Validation • Toast • Loading • Utilities
=========================================================*/

/*=========================
    RESET ERRORS
=========================*/

function clearValidation(form){

    form.querySelectorAll(".error-message").forEach(error=>{

        error.remove();

    });

    form.querySelectorAll(".is-valid").forEach(input=>{

        input.classList.remove("is-valid");

    });

    form.querySelectorAll(".is-invalid").forEach(input=>{

        input.classList.remove("is-invalid");

    });

}

/*=========================
    FORM VALIDATION
=========================*/

function validateForm(form){

    let valid=true;

    const requiredFields=form.querySelectorAll("[required]");

    requiredFields.forEach(field=>{

        if(!validateRequired(field)){

            valid=false;

        }

    });

    return valid;

}

/*=========================
    DISABLE BUTTON
=========================*/

function disableButton(button,text="Please Wait..."){

    button.disabled=true;

    button.dataset.originalText=button.innerHTML;

    button.innerHTML=
        `<span class="spinner-border spinner-border-sm"></span> ${text}`;

}

/*=========================
    ENABLE BUTTON
=========================*/

function enableButton(button){

    button.disabled=false;

    if(button.dataset.originalText){

        button.innerHTML=button.dataset.originalText;

    }

}

/*=========================
    TOAST MESSAGE
=========================*/

function showToast(message,type="success"){

    const toast=document.createElement("div");

    toast.className=`toast-message ${type}`;

    toast.innerHTML=message;

    Object.assign(toast.style,{

        position:"fixed",

        top:"25px",

        right:"25px",

        padding:"15px 25px",

        borderRadius:"10px",

        color:"#fff",

        fontWeight:"600",

        zIndex:"99999",

        boxShadow:"0 10px 30px rgba(0,0,0,.2)",

        transition:"all .4s"

    });

    switch(type){

        case "success":

            toast.style.background="#10b981";

            break;

        case "error":

            toast.style.background="#ef4444";

            break;

        case "warning":

            toast.style.background="#f59e0b";

            break;

        default:

            toast.style.background="#2563eb";

    }

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.style.opacity="0";

        toast.style.transform="translateX(100px)";

        setTimeout(()=>{

            toast.remove();

        },400);

    },3000);

}

/*=========================
    LOADING OVERLAY
=========================*/

function showLoader(){

    let loader=document.getElementById("pageLoader");

    if(loader) return;

    loader=document.createElement("div");

    loader.id="pageLoader";

    loader.innerHTML=`
        <div class="loader-spinner"></div>
    `;

    Object.assign(loader.style,{

        position:"fixed",

        inset:"0",

        background:"rgba(255,255,255,.8)",

        display:"flex",

        justifyContent:"center",

        alignItems:"center",

        zIndex:"999999"

    });

    document.body.appendChild(loader);

}

/*=========================
    HIDE LOADER
=========================*/

function hideLoader(){

    const loader=document.getElementById("pageLoader");

    if(loader){

        loader.remove();

    }

}

/*=========================
    EMAIL LOWERCASE
=========================*/

function normalizeEmail(input){

    input.value=input.value.trim().toLowerCase();

}

/*=========================
    TRIM INPUTS
=========================*/

function trimInputs(form){

    form.querySelectorAll("input, textarea").forEach(input=>{

        input.value=input.value.trim();

    });

}

/*=========================
    REAL TIME VALIDATION
=========================*/

function attachLiveValidation(selector,validator){

    document.querySelectorAll(selector).forEach(input=>{

        input.addEventListener("input",()=>{

            validator(input);

        });

        input.addEventListener("blur",()=>{

            validator(input);

        });

    });

}

/*=========================
    NUMBERS ONLY
=========================*/

function numbersOnly(input){

    input.addEventListener("input",()=>{

        input.value=input.value.replace(/\D/g,"");

    });

}

/*=========================
    LETTERS ONLY
=========================*/

function lettersOnly(input){

    input.addEventListener("input",()=>{

        input.value=input.value.replace(/[^A-Za-z ]/g,"");

    });

}

/*=========================
    CHARACTER COUNTER
=========================*/

function characterCounter(input,counterId,maxLength){

    const counter=document.getElementById(counterId);

    input.addEventListener("input",()=>{

        counter.innerText=
            `${input.value.length}/${maxLength}`;

    });

}

/*=========================
    PASSWORD STRENGTH
=========================*/

function passwordStrength(password){

    let score=0;

    if(password.length>=8) score++;

    if(/[A-Z]/.test(password)) score++;

    if(/[a-z]/.test(password)) score++;

    if(/\d/.test(password)) score++;

    if(/[@$!%*?&]/.test(password)) score++;

    return score;

}

/*=========================
    DOM READY
=========================*/

document.addEventListener("DOMContentLoaded",()=>{

    document.querySelectorAll(".numbers-only").forEach(numbersOnly);

    document.querySelectorAll(".letters-only").forEach(lettersOnly);

    attachLiveValidation(".validate-email",validateEmail);

    attachLiveValidation(".validate-phone",validatePhone);

    attachLiveValidation(".validate-name",validateName);

});

/*=========================================================
    END OF VALIDATION.JS
=========================================================*/