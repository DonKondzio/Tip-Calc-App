"use strict";

const billInput = document.querySelector(".input--bill");
const peopleInput = document.querySelector(".input--bottom");
const peopleInputContainer = peopleInput.parentElement;
const percentageContainer = document.querySelector(".percentage-container");
const percentageElements = document.querySelectorAll(".percentage-el");
const customPercentageInput = document.querySelector(".percentage-el--custom");
const tipPersonAmount = document.querySelector(".amount--tip");
const totalPersonAmount = document.querySelector(".amount--total");
const resetBtn = document.querySelector(".reset-btn");

let chosenPercentage;
let infoReadyToUpdate = false;

const handleInputError = () => {
  peopleInput.value === "0" || peopleInput.value === "-0"
    ? peopleInputContainer.classList.add("error")
    : peopleInputContainer.classList.remove("error");
};

const checkPercectageBtns = (e) => {
  if (e.target.classList.contains("percentage-el")) {
    percentageElements.forEach((el) => el.classList.remove("selected"));
    e.target.classList.add("selected");
  }
  if (e.target.classList.contains("percentage-el--normal")) {
    chosenPercentage = +e.target.textContent.slice(0, -1);
    checkAllOptions();
  } else if (e.target.classList.contains("percentage-el--custom")) {
    chosenPercentage = +e.target.value;
    checkAllOptions();
  }
};

const checkCustomPercentage = () => {
  chosenPercentage = +customPercentageInput.value;
  checkAllOptions();
};

const updateInfo = () => {
  if (!infoReadyToUpdate) {
    resetAmounts();
    return;
  }
  const baseBill = +billInput.value;
  const peopleNumber = +peopleInput.value;
  const truePercentage = chosenPercentage / 100;
  const totalCost = baseBill + baseBill * truePercentage;

  tipPersonAmount.textContent = `$${(
    (baseBill * truePercentage) /
    peopleNumber
  ).toFixed(2)}`;

  totalPersonAmount.textContent = `$${(totalCost / peopleNumber).toFixed(2)}`;
};

const checkAllOptions = () => {
  resetBtn.removeAttribute("disabled");
  percentageElements.forEach((el) => {
    if (el.classList.contains("selected")) {
      infoReadyToUpdate = true;
    }
  });

  if (!+billInput.value || !+peopleInput.value) {
    infoReadyToUpdate = false;
  }

  updateInfo();
};

const preventFromMinus = (e) => {
  if (e.target.value < 0) e.target.value *= -1;
};

const resetAll = () => {
  chosenPercentage = undefined;
  billInput.value = "";
  peopleInput.value = "";
  percentageElements.forEach((el) => el.classList.remove("selected"));
  customPercentageInput.value = "";
  resetBtn.setAttribute("disabled", true);
  resetAmounts();
};

const resetAmounts = () => {
  tipPersonAmount.textContent = totalPersonAmount.textContent = "$0.00";
};

billInput.addEventListener("input", checkAllOptions);
peopleInput.addEventListener("input", checkAllOptions);
peopleInput.addEventListener("input", preventFromMinus);
peopleInput.addEventListener("input", handleInputError);
percentageContainer.addEventListener("click", checkPercectageBtns);
customPercentageInput.addEventListener("input", checkCustomPercentage);
percentageElements.forEach((el) =>
  el.addEventListener("click", checkAllOptions)
);
resetBtn.addEventListener("click", resetAll);
