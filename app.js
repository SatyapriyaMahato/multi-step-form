const stepOne = document.getElementById('step_1'),
    stepTwo = document.getElementById('step_2'),
    stepThree = document.getElementById('step_3'),
    stepFour = document.getElementById('step_4'),
    stepFive = document.getElementById('step_5'),
    userName = document.getElementById('user_name'),
    emailId = document.getElementById('user_email'),
    userPhone = document.getElementById('user_phone'),
    nextBtn = document.getElementById('next_btn'),
    prevBtn = document.getElementById('prev_btn'),
    form = document.getElementById('step_1'),
    plan = document.querySelectorAll('.plan'),
    changeBtn = document.querySelector('.step_4_change_btn');



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
let plan_name = "";
let plan_amount = 0;
let total_amount = 0;
plan.forEach(p => {
    p.addEventListener('click', e => {
        selectedPlan();
        const className = e.target.closest('.plan');
        className.style.borderColor = "var(--Marine-blue)";
        className.style.background = "var(--Magnolia)";
        plan_amount = Number(className.getAttribute("data-value"));
        plan_name = className.querySelector('h3').innerText;
        if (yearly) plan_amount *= 12;
    })
});

function selectedPlan() {
    plan.forEach(p => {
        p.style.borderColor = "var(--Pastel-blue)";
        p.style.background = "none"
    })
};


//---------Monthly or yearly switch ---------- //

const checkbox = document.getElementById('switch-rounded'),
    monthlyParagraph = document.querySelector('.renewal p:first-child'),
    yearlyParagraph = document.querySelector('.renewal p:last-child');

let yearly = false;
checkbox.addEventListener('change', e => {
    if (checkbox.checked) {
        yearlyParagraph.style.color = 'hsl(213, 96%, 18%)';
        monthlyParagraph.style.color = 'hsl(231, 11%, 63%)';
        yearly = true;
        if (plan_amount < 16) plan_amount *= 12;
    } else {
        monthlyParagraph.style.color = 'hsl(213, 96%, 18%)';
        yearlyParagraph.style.color = 'hsl(231, 11%, 63%)';
        yearly = false;
        if (plan_amount > 16) plan_amount /= 12
    }
});

let totalAddOnAmount = 0;
let addOnAmount = 0;

//---------------------- Step 3 check ---------------------- //
function showSelectedAddOns() {
    totalAddOnAmount = 0;
    addOnAmount = 0;
    // Get all the checkboxes
    const checkboxes = document.querySelectorAll('.add_on input[type="checkbox"]');
    let selectedAddOns = [];
    // Loop through each checkbox to see if it is checked
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            // If checked, get the add-on info and amount
            const addOnInfo = checkbox.getAttribute('data-info');
            addOnAmount = parseInt(checkbox.parentElement.querySelector('.add_on_amount').getAttribute('data-value'));

            // Push the add-on info and amount to the array
            selectedAddOns.push({ info: addOnInfo, amount: addOnAmount });

            // Add the add-on amount to the total
            totalAddOnAmount += addOnAmount;

        }
    });
    updateSelectedAddOns(selectedAddOns, totalAddOnAmount);
}

function updateSelectedAddOns(selectedAddOns, totalAddOnAmount) {
    const selectedAddOnsContainer = document.getElementById('selected_addOns_container');
    // Clear the container before adding the selected add-ons
    selectedAddOnsContainer.innerHTML = '';

    // Add each selected add-on to the container
    selectedAddOns.forEach((addOn) => {
        const addOnElement = document.createElement('div');
        addOnElement.className = 'selected_addOns';
        addOnElement.innerHTML = `
            <p class="selected_addOn">${addOn.info}</p>
            <p class="addOn_price">+$${yearly ? addOn.amount * 12 : addOn.amount}/${yearly ? "yr" : "mo"}</p>
            
        `;
        selectedAddOnsContainer.appendChild(addOnElement);
    });

    // Update the total amount
}

//---------------------- Step 4 ---------------------- //
function showSelectedPlan() {
    let container = document.querySelector('.selected_plan');
    container.innerHTML = `
            <div>
                <p class="plan_name">${plan_name}(${yearly ? "yearly" : "monthly"})</p>
                <span class="step_4_change_btn" onclick="changeFunction()">Change</span>
            </div>
            <p class="monthly_plan">$${plan_amount}/${yearly ? "yr" : "mo"}</p>`;

    let total = document.querySelector('.total');
    total.innerHTML = `
            <p>Total (<span>per ${yearly ? "year" : "month"}</span>)</p>
            <p id="total_amount">$${yearly ? plan_amount + (totalAddOnAmount * 12) : plan_amount + totalAddOnAmount}/${yearly ? "yr" : "mo"}</p>`;

}


//----------------Btn functionality------------//
let count = 1;

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
    const activeNum = document.querySelector(`.number_${s}`);
    const pastNum = document.querySelector(`.number_${++s}`);
    activeNum.classList.add("done");
    pastNum.classList.remove("done");
}

nextBtn.addEventListener('click', e => {

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
            count++;
            stepOne.classList.add('hidden');
            stepTwo.classList.remove('hidden');
            prevBtn.style.visibility = "visible";
            toggleStepNumber(count);
        }
    } else if (count == 2) {
        if (plan_amount > 0) {
            stepTwo.classList.add('hidden');
            stepThree.classList.remove('hidden');
            count++;
            toggleStepNumber(count);
        }
    } else if (count == 3) {
        stepThree.classList.add('hidden');
        stepFour.classList.remove('hidden');
        count++;
        nextBtn.innerText = "Confirm";
        nextBtn.style.background = "var(--Purplish-blue)";
        toggleStepNumber(count);
        showSelectedAddOns();
        showSelectedPlan();


    } else if (count == 4) {
        stepFour.classList.add('hidden');
        stepFive.classList.remove('hidden');
        nextBtn.style.visibility = "hidden";
        prevBtn.style.visibility = "hidden";
        count++;

    }
});

prevBtn.addEventListener('click', e => {
    if (count == 2) prevBtn.style.visibility = "hidden";
    hideNext(count);
    if (count <= 4) nextBtn.style.visibility = "visible";
    count--;
    if (count <= 3) {
        nextBtn.innerText = "Next Step";
        nextBtn.style.background = "var(--Marine-blue)";

    }

    toggleRevStepNumber(count);
})

function changeFunction() {
    count = 2;
    stepFour.classList.add('hidden');
    stepTwo.classList.remove('hidden');
    nextBtn.style.visibility = "visible";
    prevBtn.style.visibility = "visible";
    document.querySelector('.number_4').classList.remove('done');
    document.querySelector('.number_2').classList.add('done');
    nextBtn.innerText = "Next Step";
    nextBtn.style.background = "var(--Marine-blue)";
}


