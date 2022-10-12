import { Week } from '../model/domain/Week.js'

export class WeekView {
  #currentWeek
  #dayListDOMReference
  #overviewSectionDOMReference
  #weekHeadingDOMReference
  #weekTotalDOMReference
  #daysButtonDOMReference
  #overviewButtonDOMReference

  constructor (dayListRef, overviewSection, weekHeadingRef, weekTotalRef, daysButtonRef, overviewButtonRef) {
    this.#dayListDOMReference = dayListRef
    this.#overviewSectionDOMReference = overviewSection
    this.#weekHeadingDOMReference = weekHeadingRef
    this.#weekTotalDOMReference = weekTotalRef
    this.#daysButtonDOMReference = daysButtonRef
    this.#overviewButtonDOMReference = overviewButtonRef
    this.#addToggleViewButtonsEventlisteners()
    Object.freeze(this)
  }

  #addToggleViewButtonsEventlisteners () {
    this.#daysButtonDOMReference.addEventListener('click', () => this.#handleShowWeekdays())
    this.#overviewButtonDOMReference.addEventListener('click', () => this.#handleShowOverview())
  }

  get currentWeek () {
    return this.#currentWeek
  }

  set currentWeek (week) {
    this.#validateWeek(week)
    this.#currentWeek = week
  }

  #validateWeek (week) {
    if (!(week instanceof Week)) {
      throw new TypeError('The week to set as current week must be an instance of Week.')
    }
  }

  showCurrentWeek () {
    if (this.#currentWeek) {
      this.#setWeekHeading()
      this.#setWeekTotal()
      this.#renderWeekdays(this.#currentWeek.dayList.days)
    }
  }

  #setWeekHeading () {
    this.#weekHeadingDOMReference.textContent = `Vecka ${this.#currentWeek.number}`
  }

  #setWeekTotal () {
    this.#weekTotalDOMReference.textContent = `Totalt: ${this.#currentWeek.getTotalCost().toString()}`
  }

  #renderWeekdays (days) {
    this.#dayListDOMReference.innerHTML = ''

    for (const day of days) {
      const dayBox = document.createElement('day-box')
      dayBox.setDay(day)
      dayBox.renderDay()
      dayBox.addEventListener('expense-added', () => this.#handleAddedExpense())
      this.#dayListDOMReference.appendChild(dayBox)
    }
  }

  #handleAddedExpense () {
    this.#setWeekTotal()
  }

  #handleShowWeekdays () {
    if (!this.#daysButtonDOMReference.hasAttribute('disabled')) {
      this.#toggleViewButtonsDisabled(this.#overviewButtonDOMReference, this.#daysButtonDOMReference)

      this.#overviewSectionDOMReference.classList.add('hidden')
      this.#dayListDOMReference.classList.remove('hidden')
    }
  }

  #handleShowOverview () {
    if (!this.#overviewButtonDOMReference.hasAttribute('disabled')) {
      this.#toggleViewButtonsDisabled(this.#daysButtonDOMReference, this.#overviewButtonDOMReference)

      this.#dayListDOMReference.classList.add('hidden')
      this.#overviewSectionDOMReference.classList.remove('hidden')
    }
  }

  #toggleViewButtonsDisabled (enabled, disabled) {
    disabled.setAttribute('disabled', true)
    disabled.classList.remove('btn__main--inactive')

    enabled.removeAttribute('disabled')
    enabled.classList.add('btn__main--inactive')
  }
}
