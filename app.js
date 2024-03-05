const emailId = document.getElementById('user_email'),
    userPhone = document.getElementById('user_phone'),
    nextBtn = document.getElementById('next_btn'),
    prevBtn = document.getElementById('prev_btn'),
    form = document.getElementById('step_1');

nextBtn.addEventListener('click', e => {
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

prevBtn.addEventListener('click', e => {
    form.style.display = "block";
})
function setSuccess() {
    form.style.display = "none";
    prevBtn.style.visibility = "visible";
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


const checkbox = document.getElementById('switch-rounded'),
    monthlyParagraph = document.querySelector('.renewal p:first-child'),
    yearlyParagraph = document.querySelector('.renewal p:last-child');

checkbox.addEventListener('change', e => {
    if (checkbox.checked) {
        yearlyParagraph.style.color = 'hsl(213, 96%, 18%)';
        monthlyParagraph.style.color = 'hsl(231, 11%, 63%)';
    } else {
        monthlyParagraph.style.color = 'hsl(213, 96%, 18%)';
        yearlyParagraph.style.color = 'hsl(231, 11%, 63%)';

    }
});