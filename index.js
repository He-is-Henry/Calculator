const buttonValues = [
  "AC",
  "+/-",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

let expression = "";
const rightSymbols = ["÷", "×", "-", "+", "="];
const topSymbols = ["AC", "+/-", "%"];

const display = document.querySelector(".display");
function clearAll() {}

function calculate(expression) {
  return new Function("return " + expression)();
}

buttonValues.forEach((buttonValue) => {
  const button = document.createElement("button");
  button.textContent = buttonValue;
  if (buttonValue === "0") {
    button.style.width = "150px";
    button.style.gridColumn = "span 2";
  }
  if (rightSymbols.includes(buttonValue)) {
    button.style.backgroundColor = "#ff9500";
  } else if (topSymbols.includes(buttonValue)) {
    button.style.backgroundColor = "#d4d4d2";
    button.style.color = "#1c1c1c";
  }
  button.addEventListener("click", function () {
    if (rightSymbols.includes(buttonValue)) {
      if (display.value === "") {
        display.value === "";
      } else if (buttonValue === "=") {
        display.value = calculate(expression);
        expression = display.value;
      } else {
        if (buttonValue === "×") {
          expression += "*";
        } else if (buttonValue === "÷") {
          expression += "/";
        } else {
          expression += buttonValue;
        }
        display.value += buttonValue;
      }
    } else if (topSymbols.includes(buttonValue)) {
      if (buttonValue === "AC") {
        display.value = "";
        expression = "";
      } else if (buttonValue === "+/-") {
        if (display.value !== "" && display.value !== "0") {
          if (display.value[0] === "-") {
            display.value = display.value.slice(1);
          } else {
            display.value = "-" + display.value;
          }
        }
      } else if (buttonValue === "%" && display.value !== "") {
        display.value += buttonValue;
        expression += "/(100)";
      }
    } else if (display.value === "0") {
      expression = buttonValue;
      display.value = buttonValue;
    } else if (buttonValue === "." && display.value === "") {
      expression = "";
      display.value = "";
    } else {
      display.value += buttonValue;
      expression += buttonValue;
    }

    if (expression.length > 8) {
      display.classList.add("reducedFont");
    } else {
      display.classList.remove("reducedFont");
    }
    if (expression === "Infinity") {
      expression = "0";
      display.value = "0";
    }
  });
  document.querySelector(".buttons").appendChild(button);
  button.classList.add("keys");
});
