const current_num = document.querySelector(".screen");
let buffer = "0";
let total = 0;
let operator;

function clickButton(value) {
    if(isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleSymbol(value) {
    if (value === "C") {
        buffer = "0";
        total = 0;
    } else if (value === "←") {
        if (buffer.length === 1) {
            buffer = "0";
        } else {
            buffer = buffer.substring(0, buffer.length-1);
        }
    } else if (value === "=") {
        if (operator !== null) {
            calculateOperation(buffer);
            operator = null;
            buffer = +total;
            total = 0;
        }
    } else {
        operator = value;
        handleMath(value);
        buffer = "0";
    }
}

function handleNumber(value) {
    if(buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleMath(value) {
    if (buffer !== "0") {
        const intBuffer = parseInt(buffer);
        if (total === 0) {
            total = intBuffer;
        } else {
            calculateOperation(intBuffer);
            buffer = "0";
        }
    } 

}

function calculateOperation(value) {
    temp = parseInt(value);
    if (operator === "÷") {
        total /= temp;
    } else if (operator === "×") {
        total *= temp;
    } else if (operator === "-") {
        total -= temp;
    } else {
        total += temp;
    }
}

function rerender() {
    current_num.innerText = buffer;
}

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
        clickButton(event.target.innerText);
    });
}

init();