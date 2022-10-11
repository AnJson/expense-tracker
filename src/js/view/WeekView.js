import { ExpenseTracker } from '../model/domain/ExpenseTracker.js'

/**
 * Immutable class representing the view for the week-box.
 *
 * @throws {TypeError} - If model is not an instance of ExpenseTracker.
 * @class Week
 */
export class WeekView {
  #model
  #dayListDOMReference
  #weekHeadingDOMReference
  #weekTotalDOMReference

  constructor (model, dayListRef, weekHeadingRef, weekTotalRef) {
    this.#validateExpenseTracker(model)
    this.#model = model
    this.#dayListDOMReference = dayListRef
    this.#weekHeadingDOMReference = weekHeadingRef
    this.#weekTotalDOMReference = weekTotalRef
    Object.freeze(this)
  }

  #validateExpenseTracker (model) {
    if (!(model instanceof ExpenseTracker)) {
      throw new TypeError('The model must be an instance of ExpenseTracker.')
    }
  }

  setWeekHeading (number) {
    this.#weekHeadingDOMReference.textContent = `Vecka ${number}`
  }

  setWeekTotal (total) {
    this.#weekTotalDOMReference.textContent = `Totalt: ${total}`
  }

  showWeekDays (event) {
    // NOTE: Show weekdays if not alreary showing and hide overview.
  }

  showOverview (event, chart) {
    // NOTE: Show overview if not alreary showing and hide weekdays.
  }
}
