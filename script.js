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

function initializeCalculator () {
    const buttonsContainer = document.querySelector('#container-buttons');

    let displayList = [];
    let lengthIncrementor = 0;
    const calcObj = {
        firstNumber : null,
        secondNumber : null,
        operator : null,
        result: null,
        operate: function (firstNumber, secondNumber, operator) {
            let result = 0;
            switch (operator) {
                case '+':
                    result = add(firstNumber, secondNumber);
                    return calcObj.format(result);
                case '-':
                    result = substract(firstNumber, secondNumber);
                    return calcObj.format(result);
                case '*':
                    result = multiply(firstNumber, secondNumber);
                    return calcObj.format(result);
                case '/':
                    result = division(firstNumber, secondNumber);
                    return calcObj.format(result);
            }
        
        },
        format: function (result) {
            let strResult = null;
            if (String(result).includes('.')) {
                strResult = result.toFixed(1);
            }
            else {
                strResult = String(result);
            }

            if (strResult.length > 7) {
                return Number(strResult).toExponential(2);
            }
            else {
                return result;
            }
            
        },

    };

    buttonsContainer.addEventListener('click', (event) => {
        const buttonElement = event.target;
        const buttonValue = event.target.textContent;

        if (calcObj.firstNumber !== null && displayList.length !== 0 && buttonElement.classList.contains('btn-operator') && calcObj.operator !== null) {
            calcObj.secondNumber = parseInt(displayList.join(''));
            calcObj.result = calcObj.operate(calcObj.firstNumber, calcObj.secondNumber, calcObj.operator);
            displayList = [];
            lengthIncrementor = 0;
            calcObj.secondNumber = null;
            calcObj.firstNumber = null;
            calcObj.operator = null;
            displayResult(calcObj.result);
        }
        
        if (buttonElement.classList.contains('btn-number')) {
            appendToInputBuffer(buttonValue);
            updateDisplay();
        }
        else if (buttonElement.classList.contains('btn-operator')) {

            if  (displayList.length === 0 && calcObj.result !== null) {
                calcObj.firstNumber = calcObj.result;
                displayList = [];
                lengthIncrementor = 0;
            }
            else if (displayList.length !== 0) {
                calcObj.firstNumber = parseInt(displayList.join(''));
                displayList = [];
                lengthIncrementor = 0;
            }

            calcObj.operator = buttonValue;
        }
        else if (buttonValue === 'AC') {
            displayResult(0);
            resetCalculator();
            calcObj.result = null;
        }
        else if (buttonValue === '=') {
            if (displayList.length !== 0) {
                calcObj.secondNumber = parseInt(displayList.join(''));
                if (calcObj.firstNumber !== null && calcObj.secondNumber !== null) {
                    calcObj.result = calcObj.operate(calcObj.firstNumber, calcObj.secondNumber, calcObj.operator);
                displayList = [];
                lengthIncrementor = 0;
                calcObj.secondNumber = null;
                calcObj.firstNumber = null;
                calcObj.operator = null;
                displayResult(calcObj.result);
                }    
            }
        }
    });

    function appendToInputBuffer(value) {
        if (lengthIncrementor < 9) {
            displayList[lengthIncrementor] = value;
            lengthIncrementor++;
        }
    };

    function resetCalculator() {
        displayList = [];
        lengthIncrementor = 0;
        calcObj.firstNumber = null;
        calcObj.secondNumber = null;
        calcObj.operator = null;
    }

    function updateDisplay() {
        const displayDiv = document.querySelector('.display-div');
        if (displayList.length < 10) {
                displayDiv.textContent = '';
                displayList.forEach( number => {
                    displayDiv.textContent += number;
                });
            }
    }

    function displayError() {
        const displayDiv = document.querySelector('.display-div');
        displayDiv.textContent = 'ERROR';
    }

    function displayResult(result) {
        const displayDiv = document.querySelector('.display-div');
        displayDiv.textContent = result;
    }
}

initializeCalculator();
