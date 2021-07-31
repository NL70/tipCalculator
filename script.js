const form = document.querySelector("form");
const billInput = document.getElementById("bill-input");
const customTipInput = document.getElementById("custon-tip-input");
const peopleInput = document.getElementById("people-input");
const tipButtons = document.getElementById("tip-buttons");
const personTipDisplay = document.getElementById("person-tip-display");
const totalPerPersonDisplay = document.getElementById(
  "total-per-person-display"
);

form.addEventListener("input", () => {
  const billValue = billInput.value;
  const customTipValue = customTipInput.value / 100;
  let peopleValue = peopleInput.value;
  if (!peopleValue) {
    peopleValue = 1;
  }
  let tipPerPerson = calculateTipPerPerson(
    billValue,
    customTipValue,
    peopleValue
  );
  let totalPerPerson = calculateTotalPerPerson(
    tipPerPerson,
    billValue,
    peopleValue
  );
  if (!customTipValue) {
    tipPerPerson = 0;
  }
  if (peopleValue == 0) {
    tipPerPerson = 0;
    totalPerPerson = 0;
  }
  personTipDisplay.innerText = "$" + tipPerPerson;
  totalPerPersonDisplay.innerText = "$" + totalPerPerson;
  console.log(billValue, customTipValue, peopleValue);
});

function calculateTipPerPerson(billValue, customTipValue, peopleValue) {
  let tipPerPerson = (billValue * customTipValue) / peopleValue;

  return tipPerPerson;
}

function calculateTotalPerPerson(tipPerPerson, billValue, peopleValue) {
  let totalPerPerson = tipPerPerson + billValue / peopleValue;

  return totalPerPerson;
}

// tipPerPerson = (bill * tipPercentage) / numberOfPeople
// totalPerPerson = tipPerPerson + (bill / numberOfPeople)
