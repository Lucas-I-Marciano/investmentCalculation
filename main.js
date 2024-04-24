import { generateReturnArray } from "./src/investmentGoals";
import { Chart } from "chart.js/auto";

function formatCurrency(value) {
  return value.toFixed(2);
}

function renderProgression() {
  // Preventing my function to run if some filds contains error
  if (document.querySelector(".error")) {
    return;
  }
  // Reseting my chart to update it
  resetCharts();

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
  console.log(returnsArray.slice(-1));
  const finalInvestmentObject = returnsArray.slice(-1)[0];

  doughnutChartReference = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Total Invested", "Profitability", "Tax"],
      datasets: [
        {
          data: [
            formatCurrency(finalInvestmentObject["investedAmount"]),
            formatCurrency(
              finalInvestmentObject["totalInterestReturns"] *
                (1 - taxRate / 100)
            ),
            formatCurrency(
              finalInvestmentObject["totalInterestReturns"] * (taxRate / 100)
            ),
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  progressionChartReference = new Chart(progressionChart, {
    type: "bar",
    data: {
      labels: returnsArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: "Total Invested",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.investedAmount)
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Return",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.interestReturns)
          ),
          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
}

function isObjectEmpty(object) {
  // It will return no keys if empty
  return Object.keys(object).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpty(doughnutChartReference) &&
    !isObjectEmpty(progressionChartReference)
  ) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
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

  resetCharts();
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

const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");
let progressionChartReference = {};
let doughnutChartReference = {};
