import { nanoid } from 'nanoid'
import { Validator } from '../domain/validation/Validator.js'
import { categoryDB } from './category-db.js'

/**
 * Temprary persistance implementing the interface of persistance.
 *
 */
export class CategoryPersistance {
  save (category, id = nanoid()) {
    Validator.validateCategory(category)
    categoryDB[id] = category
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
