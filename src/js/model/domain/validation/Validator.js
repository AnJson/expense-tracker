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
      throw new TypeError('The model must be an instance of ExpenseTracker.')
    }
  }

  validateWeekView (view) {
    if (!(view instanceof WeekView)) {
      throw new TypeError('The weekView must be an instance of WeekView.')
    }
  }

  validateWeek (week) {
    if (!(week instanceof Week)) {
      throw new TypeError('Week must be an instance of Week.')
    }
  }

  validateWeekNumber (number) {
    if (!Number.isFinite(number) || (number < 1 || number > 52)) {
      throw new TypeError('The week-number must be a number from 1 to 52.')
    }
  }

  validateDay (day) {
    if (!(day instanceof Day)) {
      throw new TypeError('Day must be an instance of Day.')
    }
  }

  validateDayNumber (number) {
    if (!Number.isFinite(number) || (number < 1 || number > 31)) {
      throw new TypeError('The day-number must be a number from 1 to 31.')
    }
  }

  validateDayName (name) {
    if (!Object.values(DayName).includes(name)) {
      throw new TypeError('The day-name must a value from the DayName-enum.')
    }
  }

  validateCategory (category) {
    if (!(category instanceof Category)) {
      throw new TypeError('Category must be of type Category.')
    }
  }

  validateCategories (categories) {
    if (categories.length !== 0 && !(categories.every(category => category instanceof Category))) {
      throw new TypeError('The categories to set must be an array containing only instances of Category.')
    }
  }

  validateExpense (expense) {
    if (!(expense instanceof Expense)) {
      throw new TypeError('Added expense must be of type Expense.')
    }
  }

  validateExpenseList (list) {
    if (!(list instanceof ExpenseList)) {
      throw new TypeError('List of expenses must be an instance of ExpenseList.')
    }
  }

  validateCost (cost) {
    if (!(cost instanceof Cost)) {
      throw new TypeError('Cost that is an instance of Cost.')
    }
  }

  validateCostValue (value) {
    if (!Number.isFinite(value) || value < 0) {
      throw new TypeError('The cost must have a value that is a number greater than or equal to zero.')
    }
  }
}
