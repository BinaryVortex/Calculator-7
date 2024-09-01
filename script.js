let display = document.getElementById('display');
let currentInput = '0';
let operatorClicked = false;
let lastInput = '';

function inputValue(value) {
    // Prevent entering multiple operators consecutively
    if (isOperator(value) && isOperator(lastInput)) {
        return;
    }

    // Clear input if operator was just clicked
    if (operatorClicked && !isOperator(value)) {
        currentInput = '';
        operatorClicked = false;
    }

    // Prevent leading zeros unless the input is '0.'
    if (currentInput === '0' && value !== '.') {
        currentInput = '';
    }

    currentInput += value;
    display.textContent = currentInput;
    lastInput = value;
}

function clearDisplay() {
    currentInput = '0';
    display.textContent = '0';
    lastInput = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1) || '0';
    display.textContent = currentInput;
    lastInput = currentInput.slice(-1);
}

function calculateResult() {
    try {
        const result = new Function('return ' + currentInput)();
        currentInput = result.toString();
        display.textContent = currentInput;
    } catch (e) {
        display.textContent = 'Error';
        currentInput = '0';
    }
    operatorClicked = true;
    lastInput = '';
}

function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}
