const emailId = document.getElementById('user_email'),
    form = document.getElementById('form'),
    userPhone = document.getElementById('user_phone');

form.addEventListener('submit', e => {
    const emailText = emailId.value.trim();
    e.preventDefault();
    if (validateEmail(emailText)) {
        setSuccess();
    } else {
        setEmailError();
    }
    if (userPhone.textContent == "") {
        setPhoneError();
    }

});
function setSuccess() {
    const frontPage = document.getElementById('newsLetter');
    frontPage.style.display = "none";
    success_div = document.getElementById('div_success');
    success_div.style.display = "block";
}

const setEmailError = () => {
    document.getElementById('label_EmailError').style.display = "block";
}

const setPhoneError = () => {
    document.getElementById('label_PhoneError').style.display = "block";
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};