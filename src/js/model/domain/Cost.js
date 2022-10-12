import { Validator } from './validation/Validator.js'

/**
 * Immutable painted class for a cost.
 *
 * @throws {TypeError} - If value is not a number or a number less than zero.
 * @class Cost
 */
export class Cost {
  #value
  #suffix

  constructor (value, suffix = ':-') {
    Validator.validateCostValue(value)
    this.#value = value
    this.#suffix = suffix
    Object.seal(this)
  }

  get value () {
    return this.#value
  }

  get suffix () {
    return this.#suffix
  }

  toString () {
    return `${this.value}${this.#suffix}`
  }

  toValue () {
    return this.#value
  }
}
