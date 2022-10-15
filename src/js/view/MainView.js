import { Validator } from '../model/domain/validation/Validator.js'

export class MainView {
  #weekView
  #daysButtonDOMReference
  #overviewButtonDOMReference
  #validator = new Validator()

  constructor (weekView, daysButtonRef, overviewButtonRef) {
    this.#validator.validateWeekView(weekView)
    this.#weekView = weekView
    this.#daysButtonDOMReference = daysButtonRef
    this.#overviewButtonDOMReference = overviewButtonRef
    this.#addToggleViewButtonsEventlisteners()
    Object.freeze(this)
  }

  #addToggleViewButtonsEventlisteners () {
    this.#daysButtonDOMReference.addEventListener('click', () => this.#handleShowWeekdays())
    this.#overviewButtonDOMReference.addEventListener('click', () => this.#handleShowOverview())
  }

  setCurrentWeek (week) {
    this.#weekView.currentWeek = week
  }

  setCategories (categories) {
    this.#weekView.categories = categories
  }

  showCurrentWeek () {
    this.#weekView.showWeekdays()
    this.#weekView.renderWeekdays()
  }

  #handleShowWeekdays () {
    if (!this.#daysButtonDOMReference.hasAttribute('disabled')) {
      this.#toggleViewButtonsDisabled(this.#overviewButtonDOMReference, this.#daysButtonDOMReference)

      this.#weekView.showWeekdays()
    }
  }

  #handleShowOverview () {
    if (!this.#overviewButtonDOMReference.hasAttribute('disabled')) {
      this.#toggleViewButtonsDisabled(this.#daysButtonDOMReference, this.#overviewButtonDOMReference)

      this.#weekView.hideWeekdays()
    }
  }

  #toggleViewButtonsDisabled (enabled, disabled) {
    disabled.setAttribute('disabled', true)
    disabled.classList.remove('btn__main--inactive')

    enabled.removeAttribute('disabled')
    enabled.classList.add('btn__main--inactive')
  }
}
