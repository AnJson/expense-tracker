import { DayName } from './DayName.js'
import { ExpenseList } from './ExpenseList.js'

/**
 * Class representing a day, containing list of expenses, a dayname and a day-number.
 *
 * @throws {TypeError} - If optional parameter is not an instance of ExpenseList.
 * @throws {TypeError} - If day-number is not a number between and including 1 and 31.
 * @throws {TypeError} - If day-name is a value from the DayName-enum.
 * @class Day
 */
export class Day {
  #expenseList
  #name
  #dayInMonth

  constructor (dayNumber, dayName, expenseList = new ExpenseList()) {
    this.#validateExpenseList(expenseList)
    this.#validateDayNumber(dayNumber)
    this.#validateDayName(dayName)
    this.#expenseList = expenseList
    this.#dayInMonth = dayNumber
    this.#name = this.#getFormattedDayName(dayName)
    Object.seal(this)
  }

  #validateExpenseList (list) {
    if (!(list instanceof ExpenseList)) {
      throw new TypeError('List of expenses must be an instance of ExpenseList.')
    }
  }

  #validateDayNumber (number) {
    if (!Number.isFinite(number) || (number < 1 || number > 31)) {
      throw new TypeError('The day-number must be a number from 1 to 31.')
    }
  }

  #validateDayName (name) {
    if (!Object.values(DayName).includes(name)) {
      throw new TypeError('The day-name must a value from the DayName-enum.')
    }
  }

  #getFormattedDayName (name) {
    let dayName = ''

    if (name === DayName.Monday) {
      dayName = 'Måndag'
    } else if (name === DayName.Tuesday) {
      dayName = 'Tisdag'
    } else if (name === DayName.Wednesday) {
      dayName = 'Onsdag'
    } else if (name === DayName.Thursday) {
      dayName = 'Torsdag'
    } else if (name === DayName.Friday) {
      dayName = 'Fredag'
    } else if (name === DayName.Saturday) {
      dayName = 'Lördag'
    } else if (name === DayName.Sunday) {
      dayName = 'Söndag'
    }

    return dayName
  }

  get name () {
    return this.#name
  }

  get dayInMonth () {
    return this.#dayInMonth
  }

  addExpense (expense) {
    this.#expenseList.addExpense(expense)
  }

  getExpenses () {
    return this.#expenseList.expenses
  }

  removeExpense (id) {
    this.#expenseList.removeExpense(id)
  }

  getTotalCost () {
    return this.#expenseList.getTotalCost()
  }

  toValue () {
    return this.#expenseList.getTotalCost().value
  }
}
