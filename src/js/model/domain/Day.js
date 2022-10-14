import { DayName } from './DayName.js'
import { ExpenseList } from './ExpenseList.js'
import { Validator } from './validation/Validator.js'

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
  #dayNameSymbol
  #number
  #validator = new Validator()

  constructor (dayNumber, dayName, expenseList = new ExpenseList()) {
    this.#validator.validateExpenseList(expenseList)
    this.#validator.validateDayNumber(dayNumber)
    this.#validator.validateDayName(dayName)
    this.#expenseList = expenseList
    this.#number = dayNumber
    this.#name = this.#getFormattedDayName(dayName)
    this.#dayNameSymbol = dayName
    Object.seal(this)
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

  get number () {
    return this.#number
  }

  get dayNameSymbol () {
    return this.#dayNameSymbol
  }

  addExpense (expense) {
    this.#expenseList.addExpense(expense)
  }

  removeExpense (id) {
    this.#expenseList.removeExpense(id)
  }

  getExpenses () {
    return this.#expenseList.expenses
  }

  getTotalCost () {
    return this.#expenseList.getTotalCost()
  }

  toValue () {
    return this.#expenseList.getTotalCost().value
  }
}
