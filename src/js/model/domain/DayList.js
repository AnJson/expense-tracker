import { Cost } from './Cost.js'
import { Day } from './Day.js'

export class DayList {
  #days
  #length

  constructor () {
    this.#days = []
    this.#length = 0
    Object.seal(this)
  }

  addDay (day) {
    this.#validateDay(day)
    this.#days.push(day)
    this.#incrementLength()
  }

  #validateDay (day) {
    if (!(day instanceof Day)) {
      throw new TypeError('Added day must be of type Day.')
    }
  }

  #incrementLength () {
    this.#length++
  }

  get length () {
    return this.#length
  }

  get days () {
    return [...this.#days]
  }

  getTotalCost () {
    const totalCost = this.#toTotalCostObject()
    return totalCost
  }

  #toTotalCostObject () {
    const sumOfWeeksExpenses = this.#days.reduce((sumOfDays, currentDay) => sumOfDays + currentDay.getTotalCost().value, 0)
    return new Cost(sumOfWeeksExpenses)
  }
}
