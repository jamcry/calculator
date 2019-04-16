const display = document.querySelector(".display");
const numBtns = document.querySelectorAll(".num-btn");
const decBtn = document.querySelector(".dec-btn");
const opBtns = document.querySelectorAll(".op-btn");
const eqBtn = document.querySelector(".eq-btn");
const row1 = document.querySelector(".row-1");
const row2 = document.querySelector(".row-2");

let inputArray = [];

numBtns.forEach(btn => btn.addEventListener("click", () => {
    // If the display value is not a number and a number is press show an error
    if (row2.textContent !== "" && Number.isNaN(parseFloat(row2.textContent))){
        clearDisplay()
    } else if (btn.innerHTML === "?") {
        alert("Calculator - Programmed by JamCry (jamcry@hotmail.com)");
    } else {
        let lastChar = row2.textContent[row2.textContent.length - 1]
        let operators = ["*", "/", "-", "+"];
        if (operators.includes(lastChar)) clearDisplay();
        // Add the pressed number to the display
        updateDisplay(btn.innerHTML);
    }
}));

decBtn.addEventListener("click", () => {
    //Check if (.) is already used in the current number
    if (!row2.textContent.includes(".")) {
        updateDisplay(".");
    } else {
        alert("Too many decimals!");
    }
});

opBtns.forEach(btn => btn.addEventListener("click", () => {
    if (btn.innerHTML === "AC") {
        clearAll();
    } else if (btn.innerHTML === "CL") {
        clear();
    } else {
        if (row2.textContent === "" || Number.isNaN(parseFloat(row2.textContent))) {
            alert("ENTER A NUMBER FIRST!");
        } else {
            inputArray.push(parseFloat(row2.textContent));
            inputArray.push(btn.innerHTML);   
            clearDisplay();
            row1.textContent = (inputArray.join(""));
        }
    }
}));

eqBtn.addEventListener("click", () => {
    // OnePlus easter egg
    if (inputArray[0] === 1 && inputArray[1] === "+") {
        updateDisplay("[1+]NEVER SETTLE!");
        display.style.background = "red";
        display.style.color = "white";
        inputArray = [""];
    } else if (row2.textContent === "" || Number.isNaN(parseFloat(row2.textContent))) {
        row2.textContent = "ERROR";
    } else {
        inputArray.push(parseFloat(row2.textContent));
        clearDisplay();
        operate();
    }
});

function operate() {
    // OnePlus easter egg 
    let history = inputArray.join("");
    lg(JSON.stringify(inputArray));

    for(let i = 0; i < inputArray.length; i++) {
        let input = inputArray[i];
        if(input === "*") {
            lg("operating *");
            let num1 = inputArray[i-1];
            let num2 = inputArray[i+1];
            let result = num1 * num2;
            lg(result);
            inputArray.splice((i-1), 3, result);
            lg(inputArray);
            i = 0;
        } else if(input === "/") {
            lg("operating /");
            let num1 = inputArray[i-1];
            let num2 = inputArray[i+1];
            let result = num1 / num2;
            lg(result)
            inputArray.splice((i-1), 3, result);
            lg(inputArray)
            i=0;
        } else {
            // Not an operator
            continue;
        }
    }
    
    for(let i = 0; i < inputArray.length; i++) {
        let input = inputArray[i];
        if(input === "+") {
            lg("operating *");
            let num1 = inputArray[i-1];
            let num2 = inputArray[i+1];
            let result = num1 + num2;
            inputArray.splice((i-1), 3, result);
            i = 0;
        } else if(input === "-") {
            let num1 = inputArray[i-1];
            let num2 = inputArray[i+1];
            let result = num1 - num2;
            inputArray.splice((i-1), 3, result);
            i = 0;
        } else {
            // Not an operator
            continue;
        }
    }
    
    row1.textContent = history + "=";
    updateDisplay(Number(inputArray[0].toFixed(5)));
    inputArray = [];
}

function clearAll(){
    row1.textContent = "";
    row2.textContent = "";
    inputArray = [];
}

let clear = () => row2.textContent = row2.textContent.slice(0, -1);
let clearDisplay = () => row2.textContent = "";
let updateDisplay = (value) => row2.textContent += value;

let add = (a, b) => a + b;
let substract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
const lg = (msg) => console.log(msg);