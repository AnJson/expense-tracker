import { getWeek, getYear } from 'date-fns'
import { Validator } from './validation/Validator'

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
    Validator.validateWeek(week)
    this.#weekPersistance.save(week, this.#currentWeekId)
  }

  getCategoriesFromPersistance () {
    return this.#categoryPersistance.getAll()
  }

  saveCategoryToPersistance (category) {
    Validator.validateCategory(category)
    this.#categoryPersistance.save(category)
  }

  #getCurrentWeeksId () {
    const weekDifferenceFromUS = -1
    const today = new Date()
    const weekNumber = getWeek(today) + weekDifferenceFromUS
    const year = getYear(today)

    return `${weekNumber}${year}`
  }
}
