import { getWeek, getYear } from 'date-fns'
import { Category } from './Category'
import { Week } from './Week'

export class ExpenseTracker {
  #weekPersistance
  #categoryPersistance
  #currentWeekId

  constructor (weekPersistance, categoryPersistance) {
    this.#weekPersistance = weekPersistance
    this.#categoryPersistance = categoryPersistance
    this.#currentWeekId = this.#getCurrentWeeksId()
    Object.freeze(this)
  }

  getCurrentWeekFromPersistance () {
    return this.#weekPersistance.get(this.#currentWeekId)
  }

  saveCurrentWeekToPersistance (week) {
    this.#validateWeek(week)
    this.#weekPersistance.save(week, this.#currentWeekId)
  }

  #validateWeek (week) {
    if (!(week instanceof Week)) {
      throw new TypeError('The week to save must be an instance of Week.')
    }
  }

  getCategoriesFromPersistance () {
    return this.#categoryPersistance.getAll()
  }

  saveCategoryToPersistance (category) {
    this.#validateCategory(category)
    this.#categoryPersistance.save(category)
  }

  #validateCategory (category) {
    if (!(category instanceof Category)) {
      throw new TypeError('The category to save must be an instance of Category.')
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
