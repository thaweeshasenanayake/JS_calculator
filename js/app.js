const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const sum = document.querySelector(".sum-btn");
const allClear = document.querySelector(".ac-btn");
const backspace = document.querySelector(".delete-btn");
const mainDisplay = document.querySelector(".main-input");
const secondaryDisplay = document.querySelector(".second-display");

let currentNumber;
let stopCalculation = false;
numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (stopCalculation === false) {
            if (mainDisplay.value.includes("=")) {
                mainDisplay.value = ""
                if (mainDisplay.value === "0" & number.innerHTML !== ".") {
                    mainDisplay.value = "";
                    mainDisplay.value += number.innerHTML;

                } else if (mainDisplay.value.length < 10) {
                    if (number.innerHTML === "." & mainDisplay.value.includes(".")) {
                        mainDisplay.value = mainDisplay.value;
                    } else {
                        mainDisplay.value += number.innerHTML;
                    }

                } else if (mainDisplay.value === "0" & number.innerText === ".") {
                    mainDisplay.value = "0."
                }
            } else {
                if (mainDisplay.value === "0" & number.innerHTML !== ".") {
                    mainDisplay.value = "";
                    mainDisplay.value += number.innerHTML;

                } else if (mainDisplay.value.length < 10) {
                    if (number.innerHTML === "." & mainDisplay.value.includes(".")) {
                        mainDisplay.value = mainDisplay.value;
                    } else {
                        mainDisplay.value += number.innerHTML;
                    }

                } else if (mainDisplay.value === "0" & number.innerText === ".") {
                    mainDisplay.value = "0."
                }
            }
        }
    })
});

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if (mainDisplay.value.includes("=")) {
            let currentValue = mainDisplay.value.slice(2);
            console.log(currentValue)
            mainDisplay.value = "0";
            if (secondaryDisplay.innerText.length == 0) {
                if (currentValue.slice(-1) == ".") {
                    secondaryDisplay.innerText = currentValue.slice(0, -1) + " " + operator.innerText;

                } else {
                    secondaryDisplay.innerText = currentValue + " " + operator.innerText;
                }
            } else {
                let previousValue = secondaryDisplay.innerText
                if (currentValue.slice(-1) == ".") {
                    secondaryDisplay.innerText = previousValue + " " + currentValue.slice(0, -1) + " " + operator.innerText;
                    calculation()
                } else {
                    secondaryDisplay.innerText = previousValue + " " + currentValue + " " + operator.innerText;
                    calculation()
                }
            }
        } else {
            let currentValue = mainDisplay.value;
            mainDisplay.value = "0";
            if (secondaryDisplay.innerText.length == 0) {
                if (currentValue.slice(-1) == ".") {
                    secondaryDisplay.innerText = currentValue.slice(0, -1) + " " + operator.innerText;
                } else {
                    secondaryDisplay.innerText = currentValue + " " + operator.innerText;
                }
            } else {
                let previousValue = secondaryDisplay.innerText
                if (currentValue.slice(-1) == ".") {
                    secondaryDisplay.innerText = previousValue + " " + currentValue.slice(0, -1) + " " + operator.innerText;
                    calculation()

                } else {
                    secondaryDisplay.innerText = previousValue + " " + currentValue + " " + operator.innerText;
                    calculation()
                }
            }
        }
    })
})

allClear.addEventListener("click", () => {
    mainDisplay.value = "0";
    secondaryDisplay.innerText = "";
    stopCalculation = false;
});

backspace.addEventListener("click", () => {
    if (stopCalculation === false) {
        mainDisplay.value = mainDisplay.value.slice(0, -1)
    } else {
        secondaryDisplay.innerText = "";
        mainDisplay.value = mainDisplay.value.slice(2)
        stopCalculation = false;
    }
})


sum.addEventListener("click", () => {
    if (stopCalculation === false) {
        if (mainDisplay.value.includes("=")) {
            secondaryDisplay.innerText += " " + mainDisplay.value.slice(2);
            calculation()
        } else {
            secondaryDisplay.innerText += " " + mainDisplay.value;
            calculation()
        }
        stopCalculation = true;
    }
});


function calculation() {
    slice = secondaryDisplay.innerText.split(" ");
    let number2;
    let answer = parseFloat(slice[0])
    if (slice.length > 2) {
        if (typeof parseInt(secondaryDisplay.innerText.slice(-1)) === "number") {
            for (let i = 1; i < (slice.length); i++) {
                if (i % 2 == 0) {
                    number2 = parseFloat(slice[i])
                    let op = (slice[i - 1]);
                    switch (op) {
                        case "+":
                            answer = answer + number2;
                            break;
                        case "-":
                            answer = answer - number2;
                            break;
                        case "×":
                            answer = answer * number2;
                            break;
                        case "÷":
                            answer = answer / number2;
                            break;
                    }
                }
            }
        } else {
            for (let i = 1; i < (slice.length - 1); i++) {
                if (i % 2 == 0) {
                    number2 = parseFloat(slice[i])
                    let op = (slice[i - 1]);
                    switch (op) {
                        case "+":
                            answer = answer + number2;
                            break;
                        case "-":
                            answer = answer - number2;
                            break;
                        case "×":
                            answer = answer * number2;
                            break;
                        case "÷":
                            answer = answer / number2;
                            break;
                    }
                }
            }
        }
    }
    mainDisplay.value = "= " + answer
    console.log(answer);
}