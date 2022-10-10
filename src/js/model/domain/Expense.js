import { nanoid } from 'nanoid'
import { Category } from './Category'
import { Cost } from './Cost'

/**
 * Immutable painted class for an expense.
 *
 * @throws {TypeError} - If category is not an instance of Category.
 * @throws {TypeError} - If cost is not an instance of Cost.
 * @class Expense
 */
export class Expense {
  #id
  #category
  #cost

  constructor (category, cost, id = nanoid()) {
    this.#validateCategory(category)
    this.#validateCost(cost)
    this.#cost = cost
    this.#category = category
    this.#id = id
    Object.seal(this)
  }

  #validateCategory (category) {
    if (!(category instanceof Category)) {
      throw new TypeError('The expense must have a category that is an instance of Category.')
    }
  }

  #validateCost (cost) {
    if (!(cost instanceof Cost)) {
      throw new TypeError('The expense must have a cost that is an instance of Cost.')
    }
  }

  get category () {
    return this.#category
  }

  get cost () {
    return this.#cost
  }

  get id () {
    return this.#id
  }
}
