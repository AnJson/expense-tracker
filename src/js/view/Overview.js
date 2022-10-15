import { ChartDrawer, StatsCollection } from '@anjson/stats-charts'

export class Overview {
  #overviewSectionDOMReference
  #chartBoxDOMReference
  #averageTextDOMReference

  constructor (overviewSection, chartBoxElement, averageTextElement) {
    this.#overviewSectionDOMReference = overviewSection
    this.#chartBoxDOMReference = chartBoxElement
    this.#averageTextDOMReference = averageTextElement
    Object.freeze(this)
  }

  showOverview () {
    this.#overviewSectionDOMReference.classList.remove('hidden')
  }

  hideOverview () {
    this.#overviewSectionDOMReference.classList.add('hidden')
  }

  renderChart (dayList) {
    const statsChartsData = this.#getStatsChartsData(dayList)
    const statsCollection = new StatsCollection(statsChartsData)
    const chartDrawer = new ChartDrawer(statsChartsData)
    this.#chartBoxDOMReference.innerHTML = ''
    chartDrawer.appendBarChart(this.#chartBoxDOMReference.getAttribute('id'), {
      title: true,
      percent: true,
      value: true,
      average: true
    })
    this.#averageTextDOMReference.textContent = `Du har under veckan betalat i snitt ${statsCollection.getAverageValue().toFixed()}:-/kategori.`
  }

  #getStatsChartsData (dayList) {
    const categorizedExpenses = this.#getCategorizedWeeksExpenses(dayList)
    return this.#generateStatsChartsData(categorizedExpenses)
  }

  #getCategorizedWeeksExpenses (dayList) {
    const categorizedExpenses = []

    dayList.days.forEach(day => {
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
