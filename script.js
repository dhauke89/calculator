const buttonsContainer = document.querySelector('.buttons');
const display = document.querySelector('.display');

let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let currentEntry = "0";
let operationComplete = false;
let currentError = false;
let lastButtonType = "";

function updateDisplay(){

    display.textContent = currentEntry;

}

updateDisplay();

buttonsContainer.addEventListener("click", function(e){
    if(e.target.tagName === "BUTTON"){
        switch(e.target.className){
            case "operator":
                if(currentError){
                    break;
                }else{
                    if(currentEntry == ""){
                        handleError("null");
                        return;
                    }else if(currentOperator === ""){
                        firstOperand = currentEntry;
                        currentOperator = e.target.textContent;
                    }else if(currentOperator !== "" && lastButtonType == "operator"){
                        currentOperator = e.target.textContent;
                    }else if(currentOperator !== ""){
                        secondOperand = currentEntry;
                        firstOperand = runOperation();
                        currentOperator = e.target.textContent;
                    }
                    break;
                };
            case "equals":
                if(currentError){
                    break;
                }else if(firstOperand === ""){
                    handleError("null");
                    return;
                }else{
                    secondOperand = currentEntry;
                    let result = runOperation();
                    if (result !== ""){
                        currentEntry = result;
                        updateDisplay();
                        currentOperator = "";
                    }else{
                        handleError("null");
                        return;
                    }
                    break;
                };
                break;
            case "clear":
                if (currentEntry == "0" || currentError == true){
                    currentOperator = "";
                    firstOperand = "";
                    currentEntry = "0"
                    currentError = false;
                }else{
                    currentEntry = "0";
                }
                break;
            default:
                if(currentError){
                    break;
                }else{
                    if(e.target.textContent == "." && currentEntry.includes(".") || currentError == true){
                        break;
                    }else{
                        if(currentEntry === "0" || operationComplete == true || currentEntry.includes("ERROR") || lastButtonType == "operator"){
                            currentEntry = e.target.textContent;
                            operationComplete = false;
                        }else{
                            currentEntry += e.target.textContent;
                        }
                    }
                }
        }
        lastButtonType = e.target.className;
        updateDisplay();
    }
})

function handleError(errorType){
    switch(errorType){
        case "NaN":
            currentEntry = "ERROR: NaN; please press CE";
            break;
        case "divByZero":
            currentEntry = "ERROR: /0; please press CE";
            break;
        case "null":
            currentEntry = "ERROR: null"
            break;
    };
    updateDisplay();
    currentError = true;
}

function runOperation(){
    let solution = ""

    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);
    if(isNaN(num1) || isNaN(num2)){
        handleError("NaN");
        return "ERROR: NaN; please press CE";
    }else{
        switch (currentOperator){
            case "+":
                solution = num1 + num2;
                break;
            case "-":
                solution = num1 - num2;
                break;
            case "*":
                solution = num1 * num2;
                break;
            case "/":
                if(num2 === 0){
                    handleError("divByZero");
                    return "ERROR: /0; please press CE";
                }else{
                    solution = num1 / num2;
                };
            default:
                break;
        }
    }
    operationComplete = true;
    return solution;
}