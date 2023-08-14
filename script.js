alert('Esta é a calculadora e Fernando Sobral!');

// Selecionar elementos através do DOM
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
// criar funções para os botões
const buttons = document.querySelectorAll("#buttons-container button");

//para ter acesso pelo console através do inspecionar

//console.log(buttons);

// iniciar propriedades, colocar valores impressos , e valor que o usuário está digitando
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }
//mostrar digitos de calcuclo no visor
  addDigit(digit) {
//checar if . da operação
    if(digit==="."&& this.currentOperationText.innerText.includes(".")) {
      return;
    }
     //console.log(digit);
    this.currentOperation = digit;
    this.updateScreen();
  }

  // Processar operações da calculadora
  processOperation(operation) {
    //checar se o valor está vazio, para trocar a operação
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      //mudança de operação
    if (this.previousOperationText.innerText !== ""){
      this.changeOperation(operation);
      }
      return;
    }
    // obter valor atual e anterior
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch(operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

        case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

        case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

        case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
        case "DEL":
        this.processDelOperator();
        break;
        case "CE":
    this.processClearCurrentOperation();
        break;
        case "C":
        this.processClearOperation();
        break;
        case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }
  

 // valor de calculo no visor
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {

console.log(operationValue, operation, current, previous);
    
    if(operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //verifique se o valor é zero, se for apenas adicione o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      //adicionar valor atual ao anterior
    this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = " ";
    }
  }

  //operações matemátiocas
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"];
  if (!mathOperations.includes(operation)) {
      return;
    }  
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }
  //deletar um digito
  processDelOperator() {
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
  }

  //limpar operação
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  //limpar todas as operações
  processClearOperation() {
    this.currentOperationText.innetText = "";
    this.previousOperationText.innerText = "";
  }
  //processo de operação
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

//eventos utilizados para dar função aos botões
// chamar botões individualmente de btn e adicionar um evento para cada, e ao clicar, retornar o valor de texto que cada um tem
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    
    //definir valor de operação
    if (+value >= 0 || value === ".") {
      calc.addDigit (value);
      console.log (value);
    } else {
      calc.processOperation(value);
    }
  });
});