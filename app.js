const display = document.querySelector(".display");
const numBtns = document.querySelectorAll(".num-btn");
const decBtn = document.querySelector(".dec-btn");
const opBtns = document.querySelectorAll(".op-btn");
const eqBtn = document.querySelector(".eq-btn");

let inputArr = [];

//2 update CL button to also remove operator
//** add a new line to form to show the op history
//FINAL: remove debugging lines

numBtns.forEach(btn => btn.addEventListener("click", () => {
    // If the display value is not a number and a number is press show an error
    if(display.value !== "" && Number.isNaN( parseFloat(display.value) )){
        clearDisplay()
        //updateDisplay("ERROR: AC FIRST");
    }
    else if(btn.innerHTML === "?") {
        alert("Calculator - Programmed by JamCry (jamcry@hotmail.com)");
    }
    else {
        // Check if last char is operator
        let lastC = display.value[display.value.length-1]
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
    if(!display.value.includes(".")) {
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
            if(display.value === "" || Number.isNaN(parseFloat(display.value))) {
                alert("ENTER A NUMBER FIRST!");
            }
            else {
            inputArr.push(parseFloat(display.value));
            inputArr.push(btn.innerHTML);
            
            
            lg(`display val: ${display.value}`);
            lg(`input array: ${JSON.stringify(inputArr)}`);
            clearDisplay();
            updateDisplay(inputArr.join(""));
                //add: PRINT THE OPERATION WITH OPERATOR
            }
            
    }
}));

eqBtn.addEventListener("click", () => {
    //X\\ NOT WORKING
    if(inputArr[0] === 1 && inputArr[1] === "+") {
        lg("one plus");
        updateDisplay("[1+]NEVER SETTLE!");
        display.style.background = "red";
        display.style.color = "white";
        inputArr = [""];
    }
    else if(display.value === "" || Number.isNaN(parseFloat(display.value))) {
        lg("array: " + inputArr);
        display.value = "ERROR";
    }
    else {
        inputArr.push(parseFloat(display.value));
        clearDisplay();
        operate();
    }
});

function operate() {
    // OnePlus easter egg
    //!! Currently overwritten by operator check
    
    let hist = inputArr.join("");
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
    lg("Operation: " + hist);
    updateDisplay(Number(inputArr[0].toFixed(5)));
    inputArr = [];
}
function clearAll(){
    display.value = "";
    inputArr = [];
}
function clear() {
    display.value = display.value.slice(0, -1);
}
function clearDisplay(){
    display.value = "";
}
function updateDisplay(value) {
    display.value += value;
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