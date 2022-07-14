const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const equal = document.querySelector("[data-equals]");
const clear = document.querySelector("[data-clear]");
const allClear = document.querySelector("[data-all-clear]");
const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector("[data-current-operand]");

let currentNumber = "";
let previousNumber = "";
let curOperation = "";

function handleNumberClick(number) {
  if (number === "." && currentNumber.toString().includes(".")) {
    return;
  }
  currentNumber = currentNumber.toString() + number.toString();
}

function handleOperationClick(operation) {
  if (currentNumber === '') { // if only just an operation button is clicked
    return;
  }
  if (previousNumber !== '') { // when an operation is clicked before = button
    calculate();
  }
  curOperation = operation;
  previousNumber = currentNumber;
  currentNumber = '';
}

function calculate() {
    let res;
    const prevNum = parseFloat(previousNumber);
    const curNum = parseFloat(currentNumber);
    if (isNaN(prevNum) || isNaN(curNum)) {
        return;
    }
    if (curOperation === "+") {
       res = prevNum + curNum;
    } else if (curOperation === "-") {
        res = prevNum - curNum;
    } else if (curOperation === "*") {
        res = prevNum * curNum;
    } else if (curOperation === "÷") {
        res = prevNum / curNum;
    } else {
        return;
    }
    previousNumber = "";
    currentNumber = res;
    curOperation = "";
}

function handleClearClick() {
    currentNumber = currentNumber.toString().slice(0, -1); // remove the last character from the number
}

function handleAllClearClick() {
    currentNumber = "";
    previousNumber = "";
    curOperation = "";
}

function format(number) {
    const splitNumber = number.toString().split('.');
    const leftDigits = parseFloat(splitNumber[0]);
    const decimalDigits = splitNumber[1];
    let leftDisplay;

    if (isNaN(leftDigits)) {
        leftDisplay = '';
    } else {
        leftDisplay = leftDigits.toLocaleString('en-IN');
    }
    
    if (decimalDigits != null) {
        return `${leftDisplay}.${decimalDigits}`;
    } else {
        return leftDisplay;
    }
}

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    handleNumberClick(button.innerText);
    currentOperand.innerText = format(currentNumber);
  });
});

operations.forEach((button) => {
  button.addEventListener("click", () => {
    handleOperationClick(button.innerText);
    previousOperand.innerText = `${format(previousNumber)} ${curOperation}`;
    currentOperand.innerText = format(currentNumber);
  });
});

equal.addEventListener('click', () => {
    if (curOperation !== '') {
        // to show the updated computation only on one = button click
        previousOperand.innerText = `${format(previousNumber)} ${curOperation} ${format(currentNumber)}`;
    }
    calculate();
    currentOperand.innerText = format(currentNumber);
});

clear.addEventListener('click', () => {
    handleClearClick();
    currentOperand.innerText = format(currentNumber);
});

allClear.addEventListener('click', () => {
    handleAllClearClick();
    previousOperand.innerText = "";
    currentOperand.innerText = "";
});
 
