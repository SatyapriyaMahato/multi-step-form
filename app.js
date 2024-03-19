const emailId = document.getElementById('user_email'),
    userPhone = document.getElementById('user_phone'),
    nextBtn = document.getElementById('next_btn'),
    prevBtn = document.getElementById('prev_btn'),
    form = document.getElementById('step_1'),
    plan = document.querySelectorAll('.plan');

let count = 0;
let className;

function selectedPlan() {
    plan.forEach(p => {
        p.style.borderColor = "var(--Pastel-blue)";
        p.style.background = "none"
    })
}


plan.forEach(p => {
    p.addEventListener('click', e => {
        selectedPlan();
        let className = e.target.closest('.plan');
        className.style.borderColor = "var(--Marine-blue)";
        className.style.background = "var(--Magnolia)";
    })
})


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
    hidePrev(step);

});

function hidePrev(s) {
    const step = document.getElementById(`step_${s}`);
    step.style.display = "none";
}

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

// slider switch 

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

// add ons

const add_ons = document.querySelectorAll(".add_on");

add_ons.forEach(addOn => {
    addOn.addEventListener('click', e => {
        const closestAddOn = e.target.closest(".add_on");
        const checkbox = closestAddOn.querySelector('input[type="checkbox"]');

        if (closestAddOn && checkbox) {
            checkbox.checked = !checkbox.checked;

            if (checkbox.checked) {
                closestAddOn.style.borderColor = "var(--Purplish-blue)";
            } else {
                closestAddOn.style.borderColor = "var(--Light-gray)";
            }
        }
    });
});

