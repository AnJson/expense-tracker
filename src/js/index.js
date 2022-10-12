import { MainController } from './controller/MainController.js'
import { ExpenseTracker } from './model/domain/ExpenseTracker.js'
import { WeeksPersistance } from './model/persistance/WeeksPercistance.js'
import { WeekView } from './view/WeekView.js'
import './view/components/day-box'
import { CategoryPersistance } from './model/persistance/CategoryPercistance.js'

const dayList = document.querySelector('#days')
const overviewSection = document.querySelector('#overview')
const weekHeading = document.querySelector('#week-heading')
const weekTotal = document.querySelector('#week-total')
const daysButton = document.querySelector('#days-button')
const overviewButton = document.querySelector('#overview-button')
const chartBox = document.querySelector('#chart-box')
const averegeText = document.querySelector('#averege')

const weekPersistance = new WeeksPersistance()
const categoryPersistance = new CategoryPersistance()
const model = new ExpenseTracker(weekPersistance, categoryPersistance)
const weekView = new WeekView(dayList, overviewSection, weekHeading, weekTotal, daysButton, overviewButton, chartBox, averegeText)
const controller = new MainController(model, weekView)

controller.initCurrentWeekData()
controller.initCategoryData()
controller.showWeek()
