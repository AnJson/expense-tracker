import { MainController } from './controller/MainController.js'
import { ExpenseTracker } from './model/domain/ExpenseTracker.js'
import { TemporaryPersistance } from './model/persistance/TemporaryPercistance.js'
import { WeekView } from './view/WeekView.js'

const persistance = new TemporaryPersistance()
const model = new ExpenseTracker(persistance)
const weekView = new WeekView(model)
const controller = new MainController(model, weekView)

const daysButton = document.querySelector('#days-button')
const overviewButton = document.querySelector('#overview-button')

daysButton.addEventListener('click', () => controller.daysButtonClickedHandler())
overviewButton.addEventListener('click', () => controller.overviewButtonClickedHandler())

controller.initCurrentWeekData()
