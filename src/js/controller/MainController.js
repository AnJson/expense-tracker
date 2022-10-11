import { getDay } from 'date-fns'
import { ExpenseTracker } from '../model/domain/ExpenseTracker.js'
import { WeekView } from '../view/WeekView'

/**
 * Immutable class representing the controller for the application.
 *
 * @throws {TypeError} - If model is not an instance of ExpenseTracker.
 * @throws {TypeError} - If weekView is not an instance of WeekView.
 * @class MainController
 */
export class MainController {
  #model
  #weekView
  #currentWeek
  #overviewIsShowing

  constructor (model, weekView) {
    this.#validateExpenseTracker(model)
    this.#validateWeekView(weekView)
    this.#model = model
    this.#weekView = weekView
    this.#overviewIsShowing = false
    Object.freeze(this)
  }

  #validateExpenseTracker (model) {
    if (!(model instanceof ExpenseTracker)) {
      throw new TypeError('The model must be an instance of ExpenseTracker.')
    }
  }

  #validateWeekView (view) {
    if (!(view instanceof WeekView)) {
      throw new TypeError('The weekView must be an instance of WeekView.')
    }
  }

  initCurrentWeekData () {
    const currentWeekFromPersistance = this.#model.getCurrentWeekFromPersistance()

    if (currentWeekFromPersistance !== null) {
      console.log(currentWeekFromPersistance) // TODO: Remove this check
      this.#currentWeek = currentWeekFromPersistance
    } else {
      // TODO: No data found, create a Week of days.
    }
  }

  #getNewWeek () {
    const firstDayOfWeekIndex = 1
    const today = new Date()
    const currentDayOfWeek = getDay(today) + firstDayOfWeekIndex
    // NOTE: Implent here.
  }

  daysButtonClickedHandler () {
    console.log('clicked!')
  }

  overviewButtonClickedHandler () {
    if (!this.#overviewIsShowing) {
      // TODO: Create array of values and categories to create ChartDrawer with.
    }
  }
}
