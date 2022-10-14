import { Cost } from './Cost.js'
import { Validator } from './validation/Validator.js'

export class DayList {
  #days
  #length
  #validator = new Validator()

  constructor () {
    this.#days = []
    this.#length = 0
    Object.seal(this)
  }

  get length () {
    return this.#length
  }

  get days () {
    return [...this.#days]
  }

  addDay (day) {
    this.#validator.validateDay(day)
    this.#days.push(day)
    this.#incrementLength()
  }

  #incrementLength () {
    this.#length++
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
