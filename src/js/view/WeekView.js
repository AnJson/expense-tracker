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
  #daysButtonDOMReference
  #overviewButtonDOMReference

  constructor (model, dayListRef, weekHeadingRef, weekTotalRef, daysButtonRef, overviewButtonRef) {
    this.#validateExpenseTracker(model)
    this.#model = model
    this.#dayListDOMReference = dayListRef
    this.#weekHeadingDOMReference = weekHeadingRef
    this.#weekTotalDOMReference = weekTotalRef
    this.#daysButtonDOMReference = daysButtonRef
    this.#overviewButtonDOMReference = overviewButtonRef
    this.#addEventlisteners()
    Object.freeze(this)
  }

  #validateExpenseTracker (model) {
    if (!(model instanceof ExpenseTracker)) {
      throw new TypeError('The model must be an instance of ExpenseTracker.')
    }
  }

  #addEventlisteners () {
    this.#daysButtonDOMReference.addEventListener('click', () => this.#handleShowWeekdays())
    this.#overviewButtonDOMReference.addEventListener('click', () => this.#handleShowOverview())
  }

  setWeekHeading (number) {
    this.#weekHeadingDOMReference.textContent = `Vecka ${number}`
  }

  setWeekTotal (total) {
    this.#weekTotalDOMReference.textContent = `Totalt: ${total}`
  }

  #handleShowWeekdays () {
    if (!this.#daysButtonDOMReference.hasAttribute('disabled')) {
      this.#daysButtonDOMReference.setAttribute('disabled', true)
      this.#overviewButtonDOMReference.removeAttribute('disabled')
      // TODO: Implement!
    }
  }

  #handleShowOverview () {
    if (!this.#overviewButtonDOMReference.hasAttribute('disabled')) {
      this.#overviewButtonDOMReference.setAttribute('disabled', true)
      this.#daysButtonDOMReference.removeAttribute('disabled')
      // TODO: Implement!
    }
  }
}
