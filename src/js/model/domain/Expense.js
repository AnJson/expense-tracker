import { nanoid } from 'nanoid'
import { Validator } from './validation/Validator.js'

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
  #validator = new Validator()

  constructor (category, cost, id = nanoid()) {
    this.#validator.validateCategory(category)
    this.#validator.validateCost(cost)
    this.#cost = cost
    this.#category = category
    this.#id = id
    Object.seal(this)
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

  getCostValue () {
    return this.#cost.value
  }
}
