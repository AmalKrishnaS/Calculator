function add (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function substract (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function division (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

const firstNumber = 0;
const secondNumber = 0;
const operator = '';

function operate (firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return substract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return division(firstNumber, secondNumber);
    }

}