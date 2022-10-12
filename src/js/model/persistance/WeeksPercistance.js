import { nanoid } from 'nanoid'
import { Week } from '../domain/Week.js'
import { weekDB } from './week-db.js'

/**
 * Temprary persistance implementing the interface of persistance.
 *
 */
export class WeeksPersistance {
  #dbPrefix = 'exptr_'

  save (week, id = nanoid()) {
    this.#validateWeek(week)
    weekDB[`${this.#dbPrefix}${id}`] = week
  }

  #validateWeek (week) {
    if (!(week instanceof Week)) {
      throw new TypeError('The week to save in persistance must be an instance of Week.')
    }
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
