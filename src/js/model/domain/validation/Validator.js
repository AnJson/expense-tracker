import { Category } from '../Category'
import { Day } from '../Day'
import { Week } from '../Week'

export class Validator {
  static validateCategories (categories) {
    if (categories.length !== 0 && !(categories.every(category => category instanceof Category))) {
      throw new TypeError('The categories to set must be an array containing only instances of Category.')
    }
  }

  static validateWeek (week) {
    if (!(week instanceof Week)) {
      throw new TypeError('The week to set as current week must be an instance of Week.')
    }
  }

  static validateDay (day) {
    if (!(day instanceof Day)) {
      throw new TypeError('Day to render must be an instance of Day.')
    }
  }
}
