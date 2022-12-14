import { nanoid } from 'nanoid'
import { Validator } from '../domain/validation/Validator.js'
import { categoryDB } from './category-db.js'

/**
 * Temprary persistance implementing the interface of persistance.
 *
 */
export class CategoryPersistance {
  #validator = new Validator()

  save (category, id = nanoid()) {
    this.#validator.validateCategory(category)
    categoryDB[id] = category
  }

  get (id) {
    const category = categoryDB[id]

    return category
  }

  getAll () {
    const allCategories = { ...categoryDB }

    return allCategories
  }
}
