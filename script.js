function initializeCalculator () {
    const buttonsContainer = document.querySelector('#container-buttons');

    let displayList = [];
    let lengthIncrementor = 0;
    let operatorButton = null;

    const calculator = {
        firstNumber : null,
        secondNumber : null,
        operator : null,
        result: null,
        operate: function () {
            let result = 0;
            switch (this.operator) {
                case '+':
                    result = this.add();
                    return this.format();
                case '-':
                    result = this.substract();
                    return this.format();
                case '*':
                    result = this.multiply();
                    return this.format();
                case '/':
                    result = this.division();
                    return this.format();
            }
        
        },
        format: function () {
            let strResult = null;
            if (String(this.result).includes('.')) {
                strResult = this.result.toFixed(1);
            }
            else {
                strResult = String(this.result);
            }

            if (strResult.length > 7) {
                return Number(strResult).toExponential(2);
            }
            else {
                return this.result;
            }
            
        },
        add: function () {
            return this.firstNumber + this.secondNumber;
        },
        substract: function () {
            return this.firstNumber - this.secondNumber;
        },
        multiply: function () {
            return this.firstNumber * this.secondNumber;
        },
        division: function () {
            return this.firstNumber / this.secondNumber;
        }

    };

    buttonsContainer.addEventListener('click', (event) => {
        const buttonElement = event.target;
        const buttonValue = event.target.textContent;

        if (buttonElement.classList.contains('btn-operator')) {
            if (operatorButton !== null) {
                operatorButton.style.backgroundColor = 'orange';
                operatorButton = null;
            }
            operatorButton = buttonElement;
            buttonElement.style.backgroundColor = 'rgb(189, 126, 9)';
        }
        else if (operatorButton !== null) {
            operatorButton.style.backgroundColor = 'orange';
            operatorButton = null;
        }

        if (calculator.firstNumber !== null && displayList.length !== 0 && buttonElement.classList.contains('btn-operator') && calculator.operator !== null) {
            calculator.secondNumber = parseInt(displayList.join(''));
            calculator.result = calculator.operate();
            displayList = [];
            lengthIncrementor = 0;
            calculator.secondNumber = null;
            calculator.firstNumber = null;
            calculator.operator = null;
            displayResult(calculator.result);
        }
        
        if (buttonElement.classList.contains('btn-number')) {
            appendToInputBuffer(buttonValue);
            updateDisplay();
        }
        else if (buttonElement.classList.contains('btn-operator')) {

            if  (displayList.length === 0 && calculator.result !== null) {
                calculator.firstNumber = calculator.result;
                displayList = [];
                lengthIncrementor = 0;
            }
            else if (displayList.length !== 0) {
                calculator.firstNumber = parseInt(displayList.join(''));
                displayList = [];
                lengthIncrementor = 0;
            }

            calculator.operator = buttonValue;
        }
        else if (buttonValue === 'AC') {
            displayResult(0);
            resetCalculator();
            calculator.result = null;
        }
        else if (buttonValue === '=') {
            if (displayList.length !== 0) {
                calculator.secondNumber = parseInt(displayList.join(''));
                if (calculator.firstNumber !== null && calculator.secondNumber !== null) {
                    calculator.result = calculator.operate();
                displayList = [];
                lengthIncrementor = 0;
                calculator.secondNumber = null;
                calculator.firstNumber = null;
                calculator.operator = null;
                displayResult(calculator.result);
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
        calculator.firstNumber = null;
        calculator.secondNumber = null;
        calculator.operator = null;
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

    function displayResult(result) {
        const displayDiv = document.querySelector('.display-div');
        displayDiv.textContent = result;
    }
}

initializeCalculator();
