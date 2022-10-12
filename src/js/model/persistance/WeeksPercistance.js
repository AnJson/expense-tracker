import { nanoid } from 'nanoid'
import { Validator } from '../domain/validation/Validator.js'
import { weekDB } from './week-db.js'

/**
 * Temprary persistance implementing the interface of persistance.
 *
 */
export class WeeksPersistance {
  #dbPrefix = 'exptr_'

  save (week, id = nanoid()) {
    Validator.validateWeek(week)
    weekDB[`${this.#dbPrefix}${id}`] = week
  }

  get (id) {
    const currentWeek = weekDB[`${this.#dbPrefix}${id}`]

    return currentWeek
  }

  getAll () {
    const allWeeks = { ...weekDB }

    return allWeeks
  }
}