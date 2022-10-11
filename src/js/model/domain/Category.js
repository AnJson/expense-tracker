import { nanoid } from 'nanoid'

/**
 * Immutable painted class for a category.
 * Saves the name formatted to lowercase and the first letter capitalized.
 *
 * @throws {TypeError} - If name is not a string or an empty string.
 * @class Category
 */
export class Category {
  #id
  #name

  constructor (name, id = nanoid()) {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new TypeError('The category name be a string with length greater than 0.')
    }

    this.#name = this.#formatString(name)
    this.#id = id
    Object.seal(this)
  }

  #formatString (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  get name () {
    return this.#name
  }

  get id () {
    return this.#id
  }

  toString () {
    return this.name
  }
}
