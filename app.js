const userName = document.getElementById('user_name'),
    emailId = document.getElementById('user_email'),
    userPhone = document.getElementById('user_phone'),
    nextBtn = document.getElementById('next_btn'),
    prevBtn = document.getElementById('prev_btn'),
    form = document.getElementById('step_1'),
    plan = document.querySelectorAll('.plan');



//---------------------- Step 1 check ---------------------- //
const toggleError = (elementId, show) => {
    document.getElementById(elementId).style.display = show ? "block" : "none";
};

const setEmailError = () => toggleError('label_EmailError', true);
const removeEmailError = () => toggleError('label_EmailError', false);

const setPhoneError = () => toggleError('label_PhoneError', true);
const removePhoneError = () => toggleError('label_PhoneError', false);

const setNameError = () => toggleError('label_NameError', true);
const removeNameError = () => toggleError('label_NameError', false);


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validateMobileNumber = (number) => {
    const mobileNumberPattern = /^[1-9]\d{9}$/;
    return mobileNumberPattern.test(number);
};



//---------------------- Step 2 check ---------------------- //
let plan_amount = 0;
plan.forEach(p => {
    p.addEventListener('click', e => {
        selectedPlan();
        const className = e.target.closest('.plan');
        className.style.borderColor = "var(--Marine-blue)";
        className.style.background = "var(--Magnolia)";
        plan_amount = Number(className.getAttribute("data-value"));
    })
});

function selectedPlan() {
    plan.forEach(p => {
        p.style.borderColor = "var(--Pastel-blue)";
        p.style.background = "none"
    })
};


//---------------------- Monthly or yearly switch ---------------------- //

const checkbox = document.getElementById('switch-rounded'),
    monthlyParagraph = document.querySelector('.renewal p:first-child'),
    yearlyParagraph = document.querySelector('.renewal p:last-child');

let yearly = false;
checkbox.addEventListener('change', e => {
    if (checkbox.checked) {
        yearlyParagraph.style.color = 'hsl(213, 96%, 18%)';
        monthlyParagraph.style.color = 'hsl(231, 11%, 63%)';
        yearly = true;

    } else {
        monthlyParagraph.style.color = 'hsl(213, 96%, 18%)';
        yearlyParagraph.style.color = 'hsl(231, 11%, 63%)';
        yearly = false;
    }
});

if (yearly) {
    plan_amount *= 12;
}




//---------------------- Step 3 check ---------------------- //

const add_ons = document.querySelectorAll(".add_on");
let add_on_amount = 0;
add_ons.forEach(addOn => {
    addOn.addEventListener('click', e => {

        const closestAddOn = e.target.closest(".add_on");
        const closestAddOn_amount = Number(closestAddOn.querySelector(".add_on_amount").getAttribute('data-value'));
        const checkbox = closestAddOn.querySelector('input[type="checkbox"]');

        if (closestAddOn && checkbox) {
            checkbox.checked = !checkbox.checked;

            if (checkbox.checked) {
                closestAddOn.style.borderColor = "var(--Purplish-blue)";
                add_on_amount += closestAddOn_amount;
            } else {
                closestAddOn.style.borderColor = "var(--Light-gray)";
                add_on_amount -= closestAddOn_amount;
            }
        }
    });
});



//----------------Btn functionality------------//
let count = 1;
let steps = [false, false, false, false];


function setSuccess() {
    form.style.display = "none";
    prevBtn.style.visibility = "visible";
}

function hidePrev(s) {
    const step = document.getElementById(`step_${s}`);
    const step2 = document.getElementById(`step_${++s}`);
    step.classList.add("hidden");
    step2.classList.remove("hidden");
}

function hideNext(s) {
    const step = document.getElementById(`step_${s}`);
    const step2 = document.getElementById(`step_${--s}`);
    step.classList.add("hidden");
    step2.classList.remove("hidden");
}

function toggleStepNumber(s) {
    const activeNum = document.querySelector(`.number_${s}`);
    const pastNum = document.querySelector(`.number_${--s}`);
    activeNum.classList.add("done");
    pastNum.classList.remove("done");
}
function toggleRevStepNumber(s) {
    console.log(s);
    const activeNum = document.querySelector(`.number_${s}`);
    const pastNum = document.querySelector(`.number_${++s}`);
    activeNum.classList.add("done");
    pastNum.classList.remove("done");
}
nextBtn.addEventListener('click', e => {
    console.log(count);
    e.preventDefault();

    if (count == 1) {
        userName.value === "" ? setNameError() : removeNameError();
        !validateMobileNumber(userPhone.value) ? setPhoneError() : removePhoneError();

        const emailText = emailId.value.trim();
        !validateEmail(emailText) ? setEmailError() : removeEmailError();

        const allErrorsClear = () =>
            ['label_EmailError', 'label_PhoneError', 'label_NameError']
                .every(id => document.getElementById(id).style.display === "none");

        const step_one = allErrorsClear();
        if (step_one) {
            steps[0] = true;
            count++;
            document.getElementById('step_1').classList.add('hidden');
            document.getElementById('step_2').classList.remove('hidden');
            prevBtn.style.visibility = "visible";
            toggleStepNumber(count);
        }
    } else if (count == 2) {
        if (plan_amount > 0) {
            steps[1] = true;
            document.getElementById('step_2').classList.add('hidden');
            document.getElementById('step_3').classList.remove('hidden');
            count++;
            toggleStepNumber(count);
        }
    } else if (count == 3) {
        steps[2] = true;
        document.getElementById('step_3').classList.add('hidden');
        document.getElementById('step_4').classList.remove('hidden');
        nextBtn.style.visibility = "hidden";
        count++;
        toggleStepNumber(count);

    }
});

prevBtn.addEventListener('click', e => {
    if (count == 2) prevBtn.style.visibility = "hidden";

    hideNext(count);
    if (count < 4) nextBtn.style.visibility = "visible";
    count--;
    steps[count] = false;
    toggleRevStepNumber(count);
})
