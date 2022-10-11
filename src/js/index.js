import { MainController } from './controller/MainController.js'
import { ExpenseTracker } from './model/domain/ExpenseTracker.js'
import { TemporaryPersistance } from './model/persistance/TemporaryPercistance.js'
import { WeekView } from './view/WeekView.js'

const dayList = document.querySelector('#days')
const weekHeading = document.querySelector('#week-heading')
const weekTotal = document.querySelector('#week-total')
const daysButton = document.querySelector('#days-button')
const overviewButton = document.querySelector('#overview-button')

const persistance = new TemporaryPersistance()
const model = new ExpenseTracker(persistance)
const weekView = new WeekView(model, dayList, weekHeading, weekTotal)
const controller = new MainController(model, weekView)

daysButton.addEventListener('click', event => controller.daysButtonClickedHandler(event))
overviewButton.addEventListener('click', event => controller.overviewButtonClickedHandler(event))

controller.initCurrentWeekData()
