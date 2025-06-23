const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resultDisplayed = false;

function factorial(n) {
  if (n < 0) return 'Err';
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'AC') {
      currentInput = '';
      resultDisplay.value = '';
      expressionDisplay.textContent = '';
    } else if (value === 'CE') {
      currentInput = currentInput.replace(/([^\d.]*)\d*$/, '');
      resultDisplay.value = currentInput;
    } else if (value === '⌫') {
      currentInput = currentInput.slice(0, -1);
      resultDisplay.value = currentInput;
    } else if (value === '=') {
      try {
        const formattedInput = currentInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/−/g, '-');
        const result = eval(formattedInput);
        expressionDisplay.textContent = currentInput;
        currentInput = result.toString();
        resultDisplay.value = currentInput;
        resultDisplayed = true;
      } catch {
        resultDisplay.value = 'Error';
        currentInput = '';
      }
    } else if (value === '√') {
      try {
        const result = Math.sqrt(eval(currentInput));
        expressionDisplay.textContent = `√(${currentInput})`;
        currentInput = result.toString();
        resultDisplay.value = currentInput;
      } catch {
        resultDisplay.value = 'Error';
        currentInput = '';
      }
    } else if (value === 'x²') {
      try {
        const result = Math.pow(eval(currentInput), 2);
        expressionDisplay.textContent = `(${currentInput})²`;
        currentInput = result.toString();
        resultDisplay.value = currentInput;
      } catch {
        resultDisplay.value = 'Error';
        currentInput = '';
      }
    } else if (value === '!') {
      try {
        const result = factorial(eval(currentInput));
        expressionDisplay.textContent = `${currentInput}!`;
        currentInput = result.toString();
        resultDisplay.value = currentInput;
      } catch {
        resultDisplay.value = 'Error';
        currentInput = '';
      }
    } else {
      if (resultDisplayed && !isNaN(value)) {
        currentInput = value;
        resultDisplayed = false;
      } else {
        currentInput += value;
      }
      resultDisplay.value = currentInput;
    }
  });
});