import { generateReturnArray } from "./src/investmentGoals";

function renderProgression() {
  // Preventing my function to run if some filds contains error
  if (document.querySelector(".error")) {
    return;
  }
  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", ".")
  );
  const additionalContribution = Number(
    document.getElementById("additional-contribution").value.replace(",", ".")
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  const returnsArray = generateReturnArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );
  console.log(returnsArray);
}

function clearForm() {
  // Getting the element by the property "name" of each element inside a form
  investmentForm["starting-amount"].value = "";
  investmentForm["additional-contribution"].value = "";
  investmentForm["time-amount"].value = "";
  investmentForm["return-rate"].value = "";
  investmentForm["tax-rate"].value = "";

  const errorInputContainers = document.querySelectorAll(".error");
  for (const errorInputContainer of errorInputContainers) {
    errorInputContainer.classList.remove("error");
    errorInputContainer.parentElement.querySelector("p").remove();
  }
  // console.log(document.querySelectorAll(".error"));
}

function validateInput(event) {
  if (event.target.value === "") {
    return;
  }

  const inputValue = event.target.value.replace(",", ".");
  const parentElement = event.target.parentElement;
  const grandParentElement = parentElement.parentElement;

  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || inputValue < 0)
  ) {
    // As I put my layer with the class error adding 3 classes, I could add just "error" class
    parentElement.classList.add("error");
    const errorParagraph = document.createElement("p");
    errorParagraph.innerText = "Please, insert a positive number";
    errorParagraph.classList.add("text-red-500");
    grandParentElement.appendChild(errorParagraph);
  } else if (
    !isNaN(inputValue) &&
    inputValue > 0 &&
    parentElement.classList.contains("error")
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

const investmentForm = document.getElementById("investment-form");
investmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderProgression();
});

for (const formElement of investmentForm) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

const buttonClear = document.getElementById("clear-form");
buttonClear.addEventListener("click", clearForm);
