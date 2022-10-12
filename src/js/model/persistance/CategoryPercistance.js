import { nanoid } from 'nanoid'
import { Category } from '../domain/Category.js'
import { categoryDB } from './category-db.js'

/**
 * Temprary persistance implementing the interface of persistance.
 *
 */
export class CategoryPersistance {
  save (category, id = nanoid()) {
    this.#validateCategory(category)
    categoryDB[id] = category
  }

  #validateCategory (category) {
    if (!(category instanceof Category)) {
      throw new TypeError('The category to save in persistance must be an instance of Category.')
    }
  }

  get (id) {
    const currentWeek = categoryDB[id]

    return currentWeek
  }

  getAll () {
    const allCategories = { ...categoryDB }

    return allCategories
  }
}
