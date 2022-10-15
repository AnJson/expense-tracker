import { Validator } from '../model/domain/validation/Validator.js'

export class WeekView {
  #overviewView
  #dayListDOMReference
  #weekTotalDOMReference
  #weekHeadingDOMReference
  #categories = []
  #currentWeek
  #validator = new Validator()

  constructor (overviewView, dayListRef, weekTotalRef, weekHeadingRef) {
    this.#validator.validateOverviewView(overviewView)
    this.#overviewView = overviewView
    this.#dayListDOMReference = dayListRef
    this.#weekTotalDOMReference = weekTotalRef
    this.#weekHeadingDOMReference = weekHeadingRef
    Object.freeze(this)
  }

  get categories () {
    return [...this.#categories]
  }

  set categories (categories) {
    this.#validator.validateCategories(categories)
    this.#categories = categories
  }

  get currentWeek () {
    return this.#currentWeek
  }

  set currentWeek (week) {
    this.#validator.validateWeek(week)
    this.#currentWeek = week
  }

  showWeekdays () {
    this.#overviewView.hideOverview()
    this.#dayListDOMReference.classList.remove('hidden')
    this.#setWeekHeading()
    this.#setWeekTotal()
  }

  #setWeekTotal () {
    this.#weekTotalDOMReference.textContent = `Totalt: ${this.#currentWeek.getTotalCost()}:-`
  }

  #setWeekHeading () {
    this.#weekHeadingDOMReference.textContent = `Vecka ${this.#currentWeek.number}`
  }

  hideWeekdays () {
    this.#dayListDOMReference.classList.add('hidden')
    this.#overviewView.showOverview()
    this.#overviewView.renderChart(this.#currentWeek.dayList)
  }

  renderWeekdays () {
    if (this.#currentWeek) {
      this.#dayListDOMReference.innerHTML = ''

      for (const day of this.#currentWeek.dayList.days) {
        const dayBox = document.createElement('day-box')
        dayBox.setDay(day)
        dayBox.setOptions(this.#categories)
        dayBox.renderDay()
        dayBox.addEventListener('expense-added', () => this.#handleAddedExpense())
        this.#dayListDOMReference.appendChild(dayBox)
      }
    }
  }

  #handleAddedExpense () {
    this.#setWeekTotal()
  }
}
