import { nanoid } from 'nanoid'
import { Validator } from './validation/Validator'

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
    Validator.validateCategory(category)
    Validator.validateCost(cost)
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
}
