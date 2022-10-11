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
  #overviewSectionDOMReference
  #weekHeadingDOMReference
  #weekTotalDOMReference
  #daysButtonDOMReference
  #overviewButtonDOMReference

  constructor (model, dayListRef, overviewSection, weekHeadingRef, weekTotalRef, daysButtonRef, overviewButtonRef) {
    this.#validateExpenseTracker(model)
    this.#model = model
    this.#dayListDOMReference = dayListRef
    this.#overviewSectionDOMReference = overviewSection
    this.#weekHeadingDOMReference = weekHeadingRef
    this.#weekTotalDOMReference = weekTotalRef
    this.#daysButtonDOMReference = daysButtonRef
    this.#overviewButtonDOMReference = overviewButtonRef
    this.#addToggleViewButtonsEventlisteners()
    Object.freeze(this)
  }

  #validateExpenseTracker (model) {
    if (!(model instanceof ExpenseTracker)) {
      throw new TypeError('The model must be an instance of ExpenseTracker.')
    }
  }

  #addToggleViewButtonsEventlisteners () {
    this.#daysButtonDOMReference.addEventListener('click', () => this.#handleShowWeekdays())
    this.#overviewButtonDOMReference.addEventListener('click', () => this.#handleShowOverview())
  }

  setWeekHeading (number) {
    this.#weekHeadingDOMReference.textContent = `Vecka ${number}`
  }

  setWeekTotal (total) {
    this.#weekTotalDOMReference.textContent = `Totalt: ${total}`
  }

  renderWeekdays (days) {
    console.log(days)
  }

  #handleShowWeekdays () {
    if (!this.#daysButtonDOMReference.hasAttribute('disabled')) {
      this.#daysButtonDOMReference.setAttribute('disabled', true)
      this.#daysButtonDOMReference.classList.remove('btn__main--inactive')
      this.#overviewButtonDOMReference.removeAttribute('disabled')
      this.#overviewButtonDOMReference.classList.add('btn__main--inactive')

      this.#overviewSectionDOMReference.classList.add('hidden')
      this.#dayListDOMReference.classList.remove('hidden')
    }
  }

  #handleShowOverview () {
    if (!this.#overviewButtonDOMReference.hasAttribute('disabled')) {
      this.#overviewButtonDOMReference.setAttribute('disabled', true)
      this.#overviewButtonDOMReference.classList.remove('btn__main--inactive')
      this.#daysButtonDOMReference.removeAttribute('disabled')
      this.#daysButtonDOMReference.classList.add('btn__main--inactive')
      this.#dayListDOMReference.classList.add('hidden')
      this.#overviewSectionDOMReference.classList.remove('hidden')
    }
  }
}
