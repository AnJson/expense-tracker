import { getDate, getDay, getWeek } from 'date-fns'
import { Day } from '../model/domain/Day.js'
import { DayList } from '../model/domain/DayList.js'
import { DayName } from '../model/domain/DayName.js'
import { Validator } from '../model/domain/validation/Validator.js'
import { Week } from '../model/domain/Week.js'

/**
 * Immutable class representing the controller for the application.
 *
 * @throws {TypeError} - If model is not an instance of ExpenseTracker.
 * @throws {TypeError} - If weekView is not an instance of WeekView.
 * @class MainController
 */
export class MainController {
  #model
  #mainView
  #validator = new Validator()

  constructor (model, mainView) {
    this.#validator.validateExpenseTracker(model)
    this.#validator.validateMainView(mainView)
    this.#model = model
    this.#mainView = mainView
    Object.freeze(this)
  }

  initCurrentWeekData () {
    const currentWeekFromPersistance = this.#model.getCurrentWeekFromPersistance()

    if (currentWeekFromPersistance) {
      this.#mainView.setCurrentWeek(currentWeekFromPersistance)
    } else {
      const newWeek = this.#getNewWeek()
      this.#mainView.setCurrentWeek(newWeek)
      this.#model.saveCurrentWeekToPersistance(newWeek)
    }
  }

  initCategoryData () {
    const categoriesFromPersistance = this.#model.getCategoriesFromPersistance()

    if (categoriesFromPersistance) {
      this.#mainView.setCategories(Object.values(categoriesFromPersistance))
    }
  }

  showWeek () {
    this.#mainView.showCurrentWeek()
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
}
