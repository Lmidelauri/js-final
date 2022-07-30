


export const numberButtons = document.querySelectorAll('[data-number]');
export const operationButtons = document.querySelectorAll('[data-operation]');
export const equalsButton = document.querySelector('[data-equals]');
export const deleteButton = document.querySelector('[data-delete]');
export const clearButton = document.querySelector('[data-all-clear]');
export const previousTextElement = document.querySelector('[data-previous]');
export const currentTextElement = document.querySelector('[data-current]');

export class Calculator {
    constructor(previousTextElement, currentTextElement) {
      this.previousTextElement = previousTextElement
      this.currentTextElement = currentTextElement
      this.clear()
  }

  clear() {
    this.current = ''
    this.previous = ''
    this.operation = undefined
  }
  appendNumber(number){
    if (number === '.' && this.current.includes('.')) return
    this.current = this.current.toString() + number.toString()
  }
  chooseOperation(operation) {
    if (this.current === '') return
    if (this.previous !== '') {
      this.compute()
    }
    this.operation = operation
    this.previous = this.current
    this.current = ''
  }
  compute() {
    let computation
    const prev = parseFloat(this.previous)
    const cur= parseFloat(this.current)
    if (isNaN(prev) || isNaN(cur)) return
    switch (this.operation) {
      case '+':
        computation = prev + cur
        break
      case '-':
        computation = prev - cur
        break
      case '*':
        computation = prev * cur
        break
      case '÷':
        computation = prev / cur
        break
      default:
        return
    }
    this.current = computation
    this.operation = undefined
    this.previous = ''
  }
  delete() {
    this.current = this.current.toString().slice(0, -1)
  }
  updateDisplay() {
    this.currentTextElement.innerText =
      this.getDisplayNumber(this.current)
    if (this.operation != null) {
      this.previousTextElement.innerText =
        `${this.getDisplayNumber(this.previous)} ${this.operation}`
    } else {
      this.previousTextElement.innerText = ''
    }
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integer
    if (isNaN(integerDigits)) {
      integer = ''
    } else {
      integer = integerDigits.toLocaleString('en', { maximumFractionDig: 0 })
    }
    if (decimalDigits != null) {
      return `${integer}.${decimalDigits}`
    } else {
      return integer
    }
  }
}

