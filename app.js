const display = document.querySelector(".display");
const numBtns = document.querySelectorAll(".num-btn");
const decBtn = document.querySelector(".dec-btn");
const opBtns = document.querySelectorAll(".op-btn");
const eqBtn = document.querySelector(".eq-btn");
const row1 = document.querySelector(".row-1");
const row2 = document.querySelector(".row-2");

let inputArr = [];

numBtns.forEach(btn => btn.addEventListener("click", () => {
    // If the display value is not a number and a number is press show an error
    if(row2.textContent !== "" && Number.isNaN( parseFloat(row2.textContent) )){
        clearDisplay()
    }
    else if(btn.innerHTML === "?") {
        alert("Calculator - Programmed by JamCry (jamcry@hotmail.com)");
    }
    else {
        let lastC = row2.textContent[row2.textContent.length-1]
        let ops = ["*","/","-","+"];
        if(ops.includes(lastC)) {
            clearDisplay();
        }
        // Add the pressed number to the display
        updateDisplay(btn.innerHTML);
        console.warn("a (num-btn) is clicked.")
        console.log(`Displaying its value (${btn.innerHTML})`);
    }
}));

decBtn.addEventListener("click", () => {
    //Check if (.) is already used in the current number
    if(!row2.textContent.includes(".")) {
        updateDisplay(".");
    }
    else {
        alert("Too many decimals!");
    }
});

opBtns.forEach(btn => btn.addEventListener("click", () => {
    if(btn.innerHTML === "AC") {
        clearAll();
    }
    else if(btn.innerHTML === "CL") {
        console.log("CL is clicked");
        clear();
    }
    else {
            if(row2.textContent === "" || Number.isNaN(parseFloat(row2.textContent))) {
                alert("ENTER A NUMBER FIRST!");
            }
            else {
            inputArr.push(parseFloat(row2.textContent));
            inputArr.push(btn.innerHTML);
            
            
            lg(`display val: ${row2.textContent}`);
            lg(`input array: ${JSON.stringify(inputArr)}`);
            clearDisplay();
            row1.textContent = (inputArr.join(""));
                //add: PRINT THE OPERATION WITH OPERATOR
            }
            
    }
}));

eqBtn.addEventListener("click", () => {
    // OnePlus easter egg
    if(inputArr[0] === 1 && inputArr[1] === "+") {
        lg("one plus");
        updateDisplay("[1+]NEVER SETTLE!");
        display.style.background = "red";
        display.style.color = "white";
        inputArr = [""];
    }
    else if(row2.textContent === "" || Number.isNaN(parseFloat(row2.textContent))) {
        lg("array: " + inputArr);
        row2.textContent = "ERROR";
    }
    else {
        inputArr.push(parseFloat(row2.textContent));
        clearDisplay();
        operate();
    }
});

function operate() {
    // OnePlus easter egg 
    let history = inputArr.join("");
    lg(JSON.stringify(inputArr));
    for(let i = 0; i < inputArr.length; i++) {
        lg(` iteration ${i}`);
        let el = inputArr[i];
        if(el === "*") {
            lg("operating *");
            let num1 = inputArr[i-1];
            let num2 = inputArr[i+1];
            let result = num1 * num2;
            lg(result);
            inputArr.splice((i-1), 3, result);
            lg(inputArr);
            i = 0;
        }
        else if(el === "/") {
            lg("operating /");
            let num1 = inputArr[i-1];
            let num2 = inputArr[i+1];
            let result = num1 / num2;
            lg(result)
            inputArr.splice((i-1), 3, result);
            lg(inputArr)
            i=0;
        }
        else {
            lg("no operator")
            continue;
        }
    }
    for(let i = 0; i < inputArr.length; i++) {
        lg(` iteration ${i}`);
        let el = inputArr[i];
        if(el === "+") {
            lg("operating *");
            let num1 = inputArr[i-1];
            let num2 = inputArr[i+1];
            let result = num1 + num2;
            lg(result);
            inputArr.splice((i-1), 3, result);
            lg(inputArr);
            i = 0;
        }
        else if(el === "-") {
            lg("operating /");
            let num1 = inputArr[i-1];
            let num2 = inputArr[i+1];
            let result = num1 - num2;
            lg(result)
            inputArr.splice((i-1), 3, result);
            lg(inputArr)
            i=0;
        }
        else {
            lg("no operator")
            continue;
        }
    }
    lg("Operation: " + history);
    row1.textContent = history + "=";
    updateDisplay(Number(inputArr[0].toFixed(5)));
    inputArr = [];
}
function clearAll(){
    row1.textContent = "";
    row2.textContent = "";
    inputArr = [];
}
function clear() {
    row2.textContent = row2.textContent.slice(0, -1);
}
function clearDisplay(){
    row2.textContent = "";
}
function updateDisplay(value) {
    row2.textContent += value;
}

function add(a,b) {
    return a+b;
}
function substract(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}
const lg = (msg) => console.log(msg);