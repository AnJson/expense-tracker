import { Validator } from './validation/Validator.js'

export class ExpenseList {
  #expenses
  #length
  #validator = new Validator()

  constructor () {
    this.#expenses = []
    this.#length = 0
    Object.seal(this)
  }

  get length () {
    return this.#length
  }

  get expenses () {
    return [...this.#expenses]
  }

  addExpense (expense) {
    this.#validator.validateExpense(expense)
    this.#expenses.push(expense)
    this.#incrementLength()
  }

  removeExpense (id) {
    const expense = this.#getExpenseById(id)

    if (this.#expenseFound(expense)) {
      this.#deleteExpense(expense)
    }
  }

  #incrementLength () {
    this.#length++
  }

  #getExpenseById (id) {
    return this.#expenses.filter(expense => expense.id === id)[0]
  }

  #expenseFound (expense) {
    return expense !== undefined
  }

  #deleteExpense (expense) {
    this.#expenses.splice(this.#expenses.indexOf(expense), 1)
  }

  getTotalCost () {
    return this.#sumUpCostOfExpenses()
  }

  #sumUpCostOfExpenses () {
    const sumOfExpenses = this.#expenses.reduce((sumOfExpenses, currentExpense) => sumOfExpenses + currentExpense.getCostValue(), 0)
    return sumOfExpenses
  }
}
