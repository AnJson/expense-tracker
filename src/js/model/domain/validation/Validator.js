import { WeekView } from '../../../view/WeekView.js'
import { Category } from '../Category.js'
import { Cost } from '../Cost.js'
import { Day } from '../Day.js'
import { DayName } from '../DayName.js'
import { Expense } from '../Expense.js'
import { ExpenseList } from '../ExpenseList.js'
import { ExpenseTracker } from '../ExpenseTracker.js'
import { Week } from '../Week.js'

export class Validator {
  validateExpenseTracker (model) {
    if (!(model instanceof ExpenseTracker)) {
      throw new TypeError('Expected the model to be of type ExpenseTracker.')
    }
  }

  validateWeekView (view) {
    if (!(view instanceof WeekView)) {
      throw new TypeError('Expected the weekview to be of type WeekView.')
    }
  }

  validateWeek (week) {
    if (!(week instanceof Week)) {
      throw new TypeError('Expected week to be of type Week.')
    }
  }

  validateWeekNumber (number) {
    if (!Number.isFinite(number) || (number < 1 || number > 52)) {
      throw new TypeError('Expected the weeknumber to be a number from 1 to 52.')
    }
  }

  validateDay (day) {
    if (!(day instanceof Day)) {
      throw new TypeError('Expected day to be of type Day.')
    }
  }

  validateDayNumber (number) {
    if (!Number.isFinite(number) || (number < 1 || number > 31)) {
      throw new TypeError('Expected daynumber to be a number from 1 to 31.')
    }
  }

  validateDayName (name) {
    if (!Object.values(DayName).includes(name)) {
      throw new TypeError('Expected dayname to be a value from the DayName-enum.')
    }
  }

  validateCategory (category) {
    if (!(category instanceof Category)) {
      throw new TypeError('Expected category to be of type Category.')
    }
  }

  validateCategories (categories) {
    if (categories.length !== 0 && !(categories.every(category => category instanceof Category))) {
      throw new TypeError('Expected categories to be an array containing only instances of Category.')
    }
  }

  validateExpense (expense) {
    if (!(expense instanceof Expense)) {
      throw new TypeError('Expected expense to be of type Expense.')
    }
  }

  validateExpenseList (list) {
    if (!(list instanceof ExpenseList)) {
      throw new TypeError('Expected list of expenses to be of type ExpenseList.')
    }
  }

  validateCost (cost) {
    if (!(cost instanceof Cost)) {
      throw new TypeError('Expected a cost to be of type Cost.')
    }
  }

  validateCostValue (value) {
    if (!Number.isFinite(value) || value < 0) {
      throw new TypeError('Expected the cost-value to be a number greater than or equal to 0.')
    }
  }
}
