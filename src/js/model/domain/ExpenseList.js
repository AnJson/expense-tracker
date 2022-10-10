import { Expense } from './Expense.js'

export class ExpenseList {
  #expenses = []
  #length = 0

  get length () {
    return this.#length
  }

  get expenses () {
    return [...this.#expenses]
  }

  addExpense (expense) {
    this.#validateExpense(expense)
    this.#expenses.push(expense)
    this.#incrementLength()
  }

  #validateExpense (expense) {
    if (!(expense instanceof Expense)) {
      throw new TypeError('Added expense must be of type Expense.')
    }
  }

  #incrementLength () {
    this.#length++
  }

  getTotalExpense () {
    return this.#toTotalExpenseObject()
  }

  #toTotalExpenseObject () {
    const sumOfExpenses = this.#expenses.reduce((sumOfExpenses, currentExpense) => sumOfExpenses + currentExpense.value, 0)
    return new Expense(sumOfExpenses)
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
