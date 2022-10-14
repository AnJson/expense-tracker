import { Validator } from './validation/Validator.js'

export class CategoryList {
  #categories
  #length
  #validator = new Validator()

  constructor () {
    this.#categories = []
    this.#length = 0
    Object.seal(this)
  }

  get length () {
    return this.#length
  }

  get categories () {
    return [...this.#categories]
  }

  addCategory (category) {
    this.#validator.validateCategory(category)
    this.#categories.push(category)
    this.#incrementLength()
  }

  removeCategory (id) {
    const category = this.#getCategoryById(id)

    if (this.#categoryFound(category)) {
      this.#deleteCategory(category)
    }
  }

  #incrementLength () {
    this.#length++
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
