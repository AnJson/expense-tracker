import { getWeek, getYear } from 'date-fns'
import { Validator } from './validation/Validator.js'

export class ExpenseTracker {
  #weekPersistance
  #categoryPersistance
  #currentWeekId
  #validator = new Validator()

  constructor (weekPersistance, categoryPersistance) {
    this.#weekPersistance = weekPersistance
    this.#categoryPersistance = categoryPersistance
    this.#currentWeekId = this.#getCurrentWeeksId()
    Object.freeze(this)
  }

  #getCurrentWeeksId () {
    const weekDifferenceFromUS = -1
    const today = new Date()
    const weekNumber = getWeek(today) + weekDifferenceFromUS
    const year = getYear(today)

    return `${weekNumber}${year}`
  }

  getCurrentWeekFromPersistance () {
    return this.#weekPersistance.get(this.#currentWeekId)
  }

  saveCurrentWeekToPersistance (week) {
    this.#validator.validateWeek(week)
    this.#weekPersistance.save(week, this.#currentWeekId)
  }

  getCategoriesFromPersistance () {
    return this.#categoryPersistance.getAll()
  }

  saveCategoryToPersistance (category) {
    this.#validator.validateCategory(category)
    this.#categoryPersistance.save(category)
  }
}
