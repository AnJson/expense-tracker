import { Cost } from './Cost.js'
import { Validator } from './validation/Validator.js'

export class ExpenseList {
  #expenses
  #length

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
    Validator.validateExpense(expense)
    this.#expenses.push(expense)
    this.#incrementLength()
  }

  #incrementLength () {
    this.#length++
  }

  getTotalCost () {
    return this.#toTotalCostObject()
  }

  #toTotalCostObject () {
    const sumOfExpenses = this.#expenses.reduce((sumOfExpenses, currentExpense) => sumOfExpenses + currentExpense.cost.value, 0)
    return new Cost(sumOfExpenses)
  }

  removeExpense (id) {
    const expense = this.#getExpenseById(id)

    if (this.#expenseFound(expense)) {
      this.#deleteExpense(expense)
    }
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
}
