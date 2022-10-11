import { getWeek, getYear } from 'date-fns'

export class ExpenseTracker {
  #persistance

  constructor (persistance) {
    this.#persistance = persistance
    Object.freeze(this)
  }

  getCurrentWeekFromPersistance () {
    const id = this.#getCurrentWeeksId()
    return this.#persistance.get(id)
  }

  #getCurrentWeeksId () {
    const weekDifferenceFromUS = -1
    const today = new Date()
    const weekNumber = getWeek(today) + weekDifferenceFromUS
    const year = getYear(today)

    return `${weekNumber}-${year}`
  }
}
