import { getDate, getDay, getWeek } from 'date-fns'
import { Day } from '../model/domain/Day.js'
import { DayList } from '../model/domain/DayList.js'
import { DayName } from '../model/domain/DayName.js'
import { ExpenseTracker } from '../model/domain/ExpenseTracker.js'
import { Week } from '../model/domain/Week.js'
import { WeekView } from '../view/WeekView.js'

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

  constructor (model, weekView) {
    this.#validateExpenseTracker(model)
    this.#validateWeekView(weekView)
    this.#model = model
    this.#weekView = weekView
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

    if (currentWeekFromPersistance) {
      this.#currentWeek = currentWeekFromPersistance
    } else {
      this.#currentWeek = this.#getNewWeek()
      this.#model.saveCurrentWeekToPersistance(this.#currentWeek)
    }

    this.#weekView.setWeekHeading(this.#currentWeek.number)
    this.#weekView.setWeekTotal(this.#currentWeek.getTotalCost().toString())
  }

  #getNewWeek () {
    const weekdaysDateNumbers = this.#generateWeekdaysDateNumbers()
    return this.#generateWeek(weekdaysDateNumbers)
  }

  #generateWeekdaysDateNumbers () {
    const today = new Date()
    const currentDayOfWeek = getDay(today)

    const weekdaysDateNumbers = []
    let difference

    for (let day = 1; day <= 7; day++) {
      difference = day - currentDayOfWeek
      weekdaysDateNumbers.push(getDate(this.#getDateRelativeToToday(difference)))
    }

    return weekdaysDateNumbers
  }

  #generateWeek (dateArray) {
    const weekDifferenceFromUS = -1
    const dayList = new DayList()
    const weekNumber = getWeek(new Date()) + weekDifferenceFromUS

    for (let i = 0; i < dateArray.length; i++) {
      const dateNumber = dateArray[i]
      const dayName = Object.values(DayName)[i]

      dayList.addDay(new Day(dateNumber, dayName))
    }

    return new Week(weekNumber, dayList)
  }

  #getDateRelativeToToday (dayDifference) {
    const date = new Date()
    const relativeDate = new Date(date.getTime())

    relativeDate.setDate(date.getDate() + dayDifference)
    return relativeDate
  }

  daysButtonClickedHandler (event) {
    if (!event.target.hasAttribute('disabled')) {
      this.#weekView.showWeekdays(event, this.#currentWeek.dayList.days)
    }
  }

  overviewButtonClickedHandler (event) {
    if (!event.target.disabled) {
      console.log('clicked overview!')
      // TODO: Create array of values and categories to create ChartDrawer with.
    }
  }
}
