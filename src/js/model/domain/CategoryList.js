import { Category } from './Category.js'

export class CategoryList {
  #categories
  #length

  constructor () {
    this.#categories = []
    this.#length = 0
    Object.seal(this)
  }

  addCategory (category) {
    this.#validateCategory(category)
    this.#categories.push(category)
    this.#incrementLength()
  }

  #validateCategory (category) {
    if (!(category instanceof Category)) {
      throw new TypeError('Added category must be of type Category.')
    }
  }

  #incrementLength () {
    this.#length++
  }

  get length () {
    return this.#length
  }

  get categories () {
    return [...this.#categories]
  }

  removeCategory (id) {
    const category = this.#getCategoryById(id)

    if (this.#categoryFound(category)) {
      this.#deleteCategory(category)
    }
  }

  #getCategoryById (id) {
    return this.#categories.filter(category => category.id === id)[0]
  }

  #categoryFound (category) {
    return category !== undefined
  }

  #deleteCategory (category) {
    this.#categories.splice(this.#categories.indexOf(category), 1)
  }
}
