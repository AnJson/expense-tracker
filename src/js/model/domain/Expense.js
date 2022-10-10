import { nanoid } from 'nanoid'

/**
 * Immutable painted class for an expense.
 *
 * @throws {TypeError} - If value is not a number or a number less than zero.
 * @class Expense
 */
export class Expense {
  #id
  #value
  #suffix

  constructor (value, id = nanoid(), suffix = ':-') {
    this.#validateValue(value)
    this.#value = value
    this.#suffix = suffix
    this.#id = id
  }

  #validateValue (value) {
    if (!Number.isFinite(value) || value < 0) {
      throw new TypeError('The expense must have a value that is a number greater than or equal to zero.')
    }
  }

  get value () {
    return this.#value
  }

  get suffix () {
    return this.#suffix
  }

  get id () {
    return this.#id
  }

  toString () {
    return `${this.value}${this.#suffix}`
  }

  toValue () {
    return this.#value
  }
}
