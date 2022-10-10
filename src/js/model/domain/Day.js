import { ExpenseList } from './ExpenseList.js'

/**
 * Class representing a day, containing list of expenses, a dayname and a day-number.
 *
 * @throws {TypeError} - If optional parameter is not an instance of ExpenseList.
 * @class Day
 */
export class Day {
  #expenseList
  #name
  #dayInMonth
  // NOTE: weekNumber?

  constructor (expenseList = new ExpenseList()) {
    // TODO: Add more parameters to create a day with name and day in month.
    this.#validateExpenseList(expenseList)
    this.#expenseList = expenseList
  }

  #validateExpenseList (list) {
    if (!(list instanceof ExpenseList)) {
      throw new TypeError('List of expenses must be an instance of ExpenseList.')
    }
  }
}
