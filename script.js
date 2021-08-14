const form = document.querySelector("form");
const billInput = document.getElementById("bill-input");
const customTipInput = document.getElementById("custom-tip-input");
const peopleInput = document.getElementById("people-input");
const personTipDisplay = document.getElementById("person-tip-display");
const totalPerPersonDisplay = document.getElementById(
  "total-per-person-display"
);
const peopleLabel = document.getElementById("people-label");
const resetButton = document.getElementById("reset-button");
const allTipButtons = document.querySelectorAll(".tip-button");
const zeroLabel = document.getElementById("zero-label");
const billLabel = document.getElementById("bill-label");
const tipLabel = document.getElementById("tip-label");
const negativeBill = document.getElementById("negative-bill");
const negativeTip = document.getElementById("negative-tip");
allTipButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const previouslySelected = document.querySelector("[data-selected]");
    if (previouslySelected) {
      previouslySelected.removeAttribute("data-selected");
    }
    button.dataset.selected = true;
    customTipInput.value = button.value;
    calculateAll();
  });
});

resetButton.addEventListener("click", () => {
  const previouslySelected = document.querySelector("[data-selected]");
  if (previouslySelected) {
    previouslySelected.removeAttribute("data-selected");
  }
  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "";
  calculateAll();
  peopleLabel.classList.remove("isZeroButText");
  zeroLabel.classList.add("isHidden");
  peopleInput.classList.remove("isZero");
});

customTipInput.addEventListener("input", () => {
  const previouslySelected = document.querySelector("[data-selected]");
  if (previouslySelected) {
    previouslySelected.removeAttribute("data-selected");
  }
});

form.addEventListener("input", () => {
  calculateAll();
});

function calculateAll() {
  const billValue = billInput.value;
  const tipValue = customTipInput.value / 100;
  let peopleValue = peopleInput.value;

  if (peopleValue < 1) {
    zeroLabel.classList.remove("isHidden");
    peopleLabel.classList.add("isZeroButText");
    peopleInput.classList.add("isZero");
  } else {
    peopleLabel.classList.remove("isZeroButText");
    zeroLabel.classList.add("isHidden");
    peopleInput.classList.remove("isZero");
  }

  if (billValue < 0) {
    negativeBill.classList.remove("isHidden");
    billLabel.classList.add("isZeroButText");
    billInput.classList.add("isZero");
  } else {
    billLabel.classList.remove("isZeroButText");
    negativeBill.classList.add("isHidden");
    billInput.classList.remove("isZero");
  }

  if (tipValue < 0 && tipValue) {
    customTipInput.classList.add("isZero");
    negativeTip.classList.remove("isHidden");
    tipLabel.classList.add("isZeroButText");
  } else {
    customTipInput.classList.remove("isZero");
    negativeTip.classList.add("isHidden");
    tipLabel.classList.remove("isZeroButText");
  }

  let tipPerPerson = calculateTipPerPerson(billValue, tipValue, peopleValue);

  let totalPerPerson = calculateTotalPerPerson(
    tipPerPerson,
    billValue,
    peopleValue
  );

  if (!tipValue) {
    tipPerPerson = 0;
  }
  if (peopleValue == 0) {
    tipPerPerson = 0;
    totalPerPerson = 0;
  }
  personTipDisplay.innerText = "$" + roundOff(tipPerPerson);
  totalPerPersonDisplay.innerText = "$" + roundOff(totalPerPerson);
}

function roundOff(number) {
  return (Math.round((number + Number.EPSILON) * 100) / 100).toFixed(2);
}

function calculateTipPerPerson(billValue, tipValue, peopleValue) {
  let tipPerPerson = (billValue * tipValue) / peopleValue;

  return tipPerPerson;
}

function calculateTotalPerPerson(tipPerPerson, billValue, peopleValue) {
  let totalPerPerson = tipPerPerson + billValue / peopleValue;

  return totalPerPerson;
}

// tipPerPerson = (bill * tipPercentage) / numberOfPeople
// totalPerPerson = tipPerPerson + (bill / numberOfPeople)
