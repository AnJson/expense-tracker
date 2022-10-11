import { getWeek, getYear } from 'date-fns'
import { Week } from './Week'

export class ExpenseTracker {
  #persistance
  #currentWeekId

  constructor (persistance) {
    this.#persistance = persistance
    this.#currentWeekId = this.#getCurrentWeeksId()
    Object.freeze(this)
  }

  getCurrentWeekFromPersistance () {
    return this.#persistance.get(this.#currentWeekId)
  }

  saveCurrentWeekToPersistance (week) {
    this.#validateWeek(week)
    this.#persistance.save(this.#currentWeekId, week)
  }

  #validateWeek (week) {
    if (!(week instanceof Week)) {
      throw new TypeError('The week to save must be an instance of Week.')
    }
  }

  #getCurrentWeeksId () {
    const weekDifferenceFromUS = -1
    const today = new Date()
    const weekNumber = getWeek(today) + weekDifferenceFromUS
    const year = getYear(today)

    return `${weekNumber}${year}`
  }
}
