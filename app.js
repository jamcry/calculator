const display = document.querySelector(".display");
const numBtns = document.querySelectorAll(".num-btn");
const decBtn = document.querySelector(".dec-btn");
const opBtns = document.querySelectorAll(".op-btn");
const eqBtn = document.querySelector(".eq-btn");

let inputArr = [];

numBtns.forEach(btn => btn.addEventListener("click", () => {
    updateDisplay(btn.innerHTML);
    console.warn("a (num-btn) is clicked.")
    console.log(`Displaying its value (${btn.innerHTML})`);
}));

decBtn.addEventListener("click", () => {
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
            inputArr.push(parseFloat(display.value));
            inputArr.push(btn.innerHTML);
            lg(`display val: ${display.value}`);
            lg(`input array: ${JSON.stringify(inputArr)}`);
            clearDisplay();

    }
}));

eqBtn.addEventListener("click", () => {
    inputArr.push(parseFloat(display.value));
    clearDisplay();
    operate();
});
function operate() {
    lg(JSON.stringify(inputArr));
    // Use two for loops to operate
    // First for * and /, second for + and -.
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