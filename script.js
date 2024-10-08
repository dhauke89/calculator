const buttonsContainer = document.querySelector('.buttons');
const display = document.querySelector('.display');

let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let currentEntry = "0";
let operationComplete = false;
let currentError = false;
let lastButtonType = "";

// Updates the calculator display
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
                        currentEntry = firstOperand;
                    }
                    break;
                };
            case "equals":
                // Handles the '=' button press, performing the calculation
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
                    }else if(currentOperator = ""){
                        handleError("nullOperator");
                        return;
                    }else{
                        handleError("null");
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
                // Handles the number and decimal button presses
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

// Handles different error scenarios
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
        case "nullOperator":
            currentEntry = "ERROR: nullOperator";
    };
    updateDisplay();
    currentError = true;
}

// Performs the arithmetic operation based on the current operator and operands
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