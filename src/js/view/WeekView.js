import { ExpenseTracker } from '../model/domain/ExpenseTracker.js'

/**
 * Immutable class representing the view for the week-box.
 *
 * @throws {TypeError} - If model is not an instance of ExpenseTracker.
 * @class Week
 */
export class WeekView {
  #model

  constructor (model) {
    this.#validateExpenseTracker(model)
    this.#model = model
    Object.freeze(this)
  }

  #validateExpenseTracker (model) {
    if (!(model instanceof ExpenseTracker)) {
      throw new TypeError('The model must be an instance of ExpenseTracker.')
    }
  }

  showWeekDays () {
    // NOTE: Show weekdays if not alreary showing and hide overview.
  }

  showOverview (chart) {
    // NOTE: Show overview if not alreary showing and hide weekdays.
  }
}
