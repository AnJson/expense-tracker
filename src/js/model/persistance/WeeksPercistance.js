import { nanoid } from 'nanoid'
import { Validator } from '../domain/validation/Validator.js'
import { weekDB } from './week-db.js'

/**
 * Temporary persistance implementing the interface of persistance.
 *
 */
export class WeeksPersistance {
  #validator = new Validator()

  save (week, id = nanoid()) {
    this.#validator.validateWeek(week)
    weekDB[id] = week
  }

  get (id) {
    const week = weekDB[id]

    return week
  }

  getAll () {
    const allWeeks = { ...weekDB }

    return allWeeks
  }
}
