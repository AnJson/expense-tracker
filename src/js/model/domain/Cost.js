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
    this.#validateValue(value)
    this.#value = value
    this.#suffix = suffix
    Object.seal(this)
  }

  #validateValue (value) {
    if (!Number.isFinite(value) || value < 0) {
      throw new TypeError('The cost must have a value that is a number greater than or equal to zero.')
    }
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
