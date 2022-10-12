import { DayList } from './DayList.js'
import { DayName } from './DayName.js'
import { Validator } from './validation/Validator.js'

export class Week {
  #number
  #dayList

  constructor (number, dayList) {
    Validator.validateWeekNumber(number)
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
    return this.#dayList
  }

  getTotalCost () {
    const totalCost = this.#dayList.getTotalCost()
    return totalCost
  }

  toValue () {
    return this.#dayList.getTotalCost().value
  }
}
