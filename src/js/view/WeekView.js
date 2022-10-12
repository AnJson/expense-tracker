import { ChartDrawer, StatsCollection } from '@anjson/stats-charts'
import { Validator } from '../model/domain/validation/Validator.js'

export class WeekView {
  #currentWeek
  #categories
  #dayListDOMReference
  #overviewSectionDOMReference
  #weekHeadingDOMReference
  #weekTotalDOMReference
  #daysButtonDOMReference
  #overviewButtonDOMReference
  #chartBoxDOMReference
  #averegeTextDOMReference

  constructor (dayListRef, overviewSection, weekHeadingRef, weekTotalRef, daysButtonRef, overviewButtonRef, chartBoxElement, averegeTextElement) {
    this.#categories = []
    this.#dayListDOMReference = dayListRef
    this.#overviewSectionDOMReference = overviewSection
    this.#weekHeadingDOMReference = weekHeadingRef
    this.#weekTotalDOMReference = weekTotalRef
    this.#daysButtonDOMReference = daysButtonRef
    this.#overviewButtonDOMReference = overviewButtonRef
    this.#chartBoxDOMReference = chartBoxElement
    this.#averegeTextDOMReference = averegeTextElement
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
    Validator.validateWeek(week)
    this.#currentWeek = week
  }

  get categories () {
    return [...this.#categories]
  }

  set categories (categories) {
    Validator.validateCategories(categories)
    this.#categories = categories
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
      dayBox.setOptions(this.#categories)
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

  /**
   * Appends chart to overview based on current data.
   *
   */
  #handleShowOverview () {
    if (!this.#overviewButtonDOMReference.hasAttribute('disabled')) {
      this.#toggleViewButtonsDisabled(this.#daysButtonDOMReference, this.#overviewButtonDOMReference)

      this.#renderChart()

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

  #renderChart () {
    const statsChartsData = this.#getStatsChartsData()
    const statsCollection = new StatsCollection(statsChartsData)
    const chartDrawer = new ChartDrawer(statsChartsData)
    this.#chartBoxDOMReference.innerHTML = ''
    chartDrawer.appendBarChart(this.#chartBoxDOMReference.getAttribute('id'))
    this.#averegeTextDOMReference.textContent = `I snitt betalar du ${statsCollection.getAverageValue().toFixed()}:- per categori.`
  }

  #getStatsChartsData () {
    const categorizedExpenses = this.#getCategorizedWeeksExpenses()
    return this.#generateStatsChartsData(categorizedExpenses)
  }

  #getCategorizedWeeksExpenses () {
    const categorizedExpenses = []

    this.#currentWeek.dayList.days.forEach(day => {
      const expenses = day.getExpenses()
      const expensesAsStatsChartsObjects = expenses.map(expense => (
        {
          title: expense.category.name,
          value: expense.cost.value
        }
      ))
      categorizedExpenses.push(...expensesAsStatsChartsObjects)
    })

    return categorizedExpenses
  }

  #generateStatsChartsData (expenses) {
    const hashMap = {}
    expenses.forEach(object => {
      if (!Object.keys(hashMap).includes(object.title)) {
        hashMap[object.title] = object.value
      } else {
        hashMap[object.title] += object.value
      }
    })

    const statsChartsData = []
    for (const category of Object.keys(hashMap)) {
      const statsChartsObject = {
        title: category,
        value: hashMap[category]
      }

      statsChartsData.push(statsChartsObject)
    }

    return statsChartsData
  }
}
