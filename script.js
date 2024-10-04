const buttonsContainer = document.querySelector('.buttons');
const display = document.querySelector('.display');

let firstOperand = null;
let currentOperator = null;
let currentEntry = "";

buttonsContainer.addEventListener("click", function(e){
    if(e.target.tagName === "BUTTON"){
        switch(e.target.textContent){
            case "+":
            case "-":
            case "*":
            case "/":
                if(currentOperator === null){
                    currentOperator = e.target.textContent;
                }else{
                    runOperation();
                    currentOperator = e.target.textContent;
                }
                break;
            case "=":
                runOperation();
                break;
            case "CE":
                if (currentEntry == ""){
                    currentEntry = "";
                    currentOperator = null;
                    firstOperand = null;
                }else{
                    currentEntry = "";
                }
                break;
            default:
                if(e.target.textContent == "." && currentEntry.includes(".")){
                    break;
                }else{
                    currentEntry += e.target.textContent;
                }
        }
    }
})