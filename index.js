document.addEventListener('DOMContentLoaded', () => {
    const calcButton = document.querySelector('.calc-result');
    calcButton && calcButton.addEventListener('click', onClickHandler);
    const prevResultElem = document.querySelector(".prev-result");
    if (prevResultElem && window.localStorage && window.localStorage.getItem('previousResult'))
        prevResultElem.innerHTML = window.localStorage.getItem('previousResult');
})

function setRes(result) {
    const prevResultElem = document.querySelector(".prev-result");
    const currResultElem = document.querySelector(".current-result");
    if (prevResultElem && currResultElem) {
        if (currResultElem.innerHTML) prevResultElem.innerHTML = currResultElem.innerHTML;
        currResultElem.innerHTML = result;
        window.localStorage && window.localStorage.setItem('previousResult', result);
    }
}

function onClickHandler() {
    const firstNumElem = document.querySelector("#first-number");
    const secondNumElem = document.querySelector("#second-number");
    const operationElem = document.querySelector(".select-operation");

    if (firstNumElem
        && secondNumElem
        && operationElem) {
        const firstNumber = parseFloat(firstNumElem.value);
        const secondNumber = parseFloat(secondNumElem.value);

        if (!isNaN(firstNumber) && !isNaN(secondNumber)) {
            const operation = operationElem.value;
            if (operation === "/" || operation === "%") {
                if (secondNumber === 0) {
                    alert('Попытка деления на 0');
                    return;
                }
            }
            let result = "";
            switch (operation) {
                case "+":
                    result = firstNumber + secondNumber;
                    break;
                case "-":
                    result = firstNumber - secondNumber;
                    break;
                case "∗":
                    result = firstNumber * secondNumber;
                    break;
                case "/":
                    result = firstNumber / secondNumber;
                    break;
                case "%":
                    result = firstNumber % secondNumber;
                    break;
                case "^":
                    result = firstNumber ** secondNumber;
                    break;
            }
            const resultStr = operation === '/' && result % 1 !== 0
                ? `${firstNumber} ${operation} ${secondNumber} = ${result.toFixed(6)}` 
                : `${firstNumber} ${operation} ${secondNumber} = ${result}`;
            setRes(resultStr);
        }
        else {
            alert('Поля заполенены некорректно!')
        }

    }
}

