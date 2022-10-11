import { MainController } from './controller/MainController.js'
import { ExpenseTracker } from './model/domain/ExpenseTracker.js'
import { TemporaryPersistance } from './model/persistance/TemporaryPercistance.js'
import { WeekView } from './view/WeekView.js'
import './view/components/day-box'
import { Day } from './model/domain/Day.js'
import { DayName } from './model/domain/DayName.js'

const dayList = document.querySelector('#days')
const overviewSection = document.querySelector('#overview')
const weekHeading = document.querySelector('#week-heading')
const weekTotal = document.querySelector('#week-total')
const daysButton = document.querySelector('#days-button')
const overviewButton = document.querySelector('#overview-button')

const persistance = new TemporaryPersistance()
const model = new ExpenseTracker(persistance)
const weekView = new WeekView(dayList, overviewSection, weekHeading, weekTotal, daysButton, overviewButton)
const controller = new MainController(model, weekView)

controller.initCurrentWeekData()

// NOTE: Webcomponent test.
const dayBox = document.createElement('day-box')
dayList.appendChild(dayBox)
dayBox.renderDay(new Day(11, DayName.Tuesday))
