import { DayList } from './DayList.js'
import { DayName } from './DayName.js'

export class Week {
  #number
  #dayList

  constructor (number, dayList) {
    this.#validateWeekNumber(number)
    this.#validateDayList(dayList)
    this.#number = number
    this.#dayList = dayList
    Object.seal(this)
  }

  #validateDayList (list) {
    if (!(list instanceof DayList)) {
      throw new TypeError('List of days must be an instance of DayList.')
    }

    if (!this.#hasCorrectWeekDays(list)) {
      throw new TypeError('List of days must include only seven different weekdays.')
    }
  }

  #validateWeekNumber (number) {
    if (!Number.isFinite(number) || (number < 1 || number > 52)) {
      throw new TypeError('The week-number must be a number from 1 to 52.')
    }
  }

  #hasCorrectWeekDays (list) {
    let isCorrect = false

    if (list.length === 7) {
      isCorrect = this.#containsAllWeekdays(list)
    }

    return isCorrect
  }

  #containsAllWeekdays (list) {
    const weekDays = Object.values(DayName)
    const dayNamesInList = list.days.map(day => day.dayNameSymbol)

    let allDaysInList = true

    for (const daySymbol of weekDays) {
      if (!dayNamesInList.includes(daySymbol)) {
        allDaysInList = false
      }
    }

    return allDaysInList
  }

  get number () {
    return this.#number
  }

  get dayList () {
    return [...this.#dayList]
  }

  /* getTotalCost () {
    return this.#expenseList.getTotalCost()
  } */

  /* toValue () {
    return this.#expenseList.getTotalCost().value
  } */
}
