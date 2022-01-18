const calc = {
    maxLength: 16,
    displayValue: '',
    operator: undefined,
    operands: [],
    wiped: false,
    appendInt(e) {
        const int = e.target.innerText;

        if (calc.operands.length === 1 && !calc.wiped) {
            calc.displayValue = '';
            calc.wiped = true;
        }

        if (calc.displayValue.length < calc.maxLength) {
            calc.displayValue = calc.displayValue.concat(int);
        }
        calc.updateDisplay();
    },
    selectOperator(e) {
        if (calc.displayValue) calc.operands.push(calc.displayValue);

        if (calc.operands.length === 2) {
            calc.operate();
            calc.operands.push(calc.displayValue);
        }
        calc.operator = e.target.innerText;
    },
    operate() {
        const a = calc.operands[0];
        const b = calc.operands[1];
        if(isNaN(a) || isNaN(b)) {
            calc.displayValue = 'ERROR';
            calc.updateDisplay();
            return;
        }

        let value;

        switch(calc.operator) {
            case '+': value = add(a, b); break;
            case '-': value = subtract(a, b); break;
            case '\u00f7': value = divide(a, b); break;
            case '\u00d7': value = multiply(a, b); break;
        }
        value = value.toString();
        calc.displayValue = value;
        calc.operands = [];
        calc.wiped = false;
        calc.updateDisplay();
    },
    updateDisplay() {
        document.querySelector('.display').innerText = calc.displayValue;
    },
    clear() {
        calc.displayValue = '';
        calc.operands = [];
        calc.updateDisplay();
    }
}

document.querySelectorAll('.num-btn').forEach(div => {
    div.addEventListener('click', calc.appendInt);
});

document.getElementById('clear-btn').addEventListener('click', calc.clear);

document.querySelectorAll('.operator-btn').forEach(div => {
    if (!div.classList.contains('empty')) {
        div.addEventListener('click', calc.selectOperator);
    }
});

document.getElementById('equal-btn').addEventListener('click', () => {
    if (calc.operands.length === 2 && calc.operator) {
        calc.operate();
    }
});

/*
    first enter a number

    add the operator -> if the user presses + then *, the second operator(*) will be used and
                        the first is ignored. if there is one operand in the array already
                        this is the equivalent of pressing the equal sign(see below)

    enter a second number -> the operands array is emptied, the first number is pushed into
                             the operands array, and the display value turns into the first int
                             that is entered. After the rest of the number is appended like normal.
                             important: checking if operator is blank or not determines if user is
                             entering a second number

    press equal sign -> the current display value is pushed to the operands(operands length should be 2)
                        switch case depending on the operator and call the respective function using
                        the operands at args. display value becomes the output of the operate function,
                        the operands becomes an empty array and the operator becomes an empty string

*/

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}