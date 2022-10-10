import { Category } from './model/domain/Category.js'
// import { CategoryList } from './model/domain/CategoryList.js'
import { Cost } from './model/domain/Cost.js'
import { Day } from './model/domain/Day.js'
import { DayList } from './model/domain/DayList.js'
import { DayName } from './model/domain/DayName.js'
import { Expense } from './model/domain/Expense.js'
import { ExpenseList } from './model/domain/ExpenseList.js'
import { Week } from './model/domain/Week.js'

// --------------------------------------
// Testing Expenses.
// --------------------------------------

// Instanciate costs.
const payment1 = new Cost(2000)
const payment2 = new Cost(125)
const payment3 = new Cost(75)

// Instanciate categories.
const cat1 = new Category('vilda västern')
const cat2 = new Category('whatever')
const cat3 = new Category('matvaror')

// Instanciate expenses.
const exp1 = new Expense(cat1, payment1)
const exp2 = new Expense(cat2, payment2)
const exp3 = new Expense(cat3, payment3)

// Populate expense-list.
const expenseList = new ExpenseList()

expenseList.addExpense(exp1)
expenseList.addExpense(exp2)
expenseList.addExpense(exp3)

// Instanciate days.
const mon = new Day(10, DayName.Monday, expenseList)
const tue = new Day(11, DayName.Tuesday, expenseList)
const wed = new Day(12, DayName.Wednesday, expenseList)
const thu = new Day(12, DayName.Thursday, expenseList)
const fri = new Day(12, DayName.Friday, expenseList)
const sat = new Day(12, DayName.Saturday, expenseList)
const sun = new Day(12, DayName.Sunday, expenseList)

// Instaciate day-list
const dayList = new DayList()

dayList.addDay(mon)
dayList.addDay(tue)
dayList.addDay(wed)
dayList.addDay(thu)
dayList.addDay(fri)
dayList.addDay(sat)
dayList.addDay(sun)

// Populate week.
const week1 = new Week(1, dayList)

console.log(week1)

/* console.log(expenseList.expenses)
expenseList.removeExpense(exp1.id)
console.log(expenseList.expenses)
const totalCost = expenseList.getTotalCost()
console.log(totalCost.toString()) */

// --------------------------------------
// Testing CategoryList.
// --------------------------------------

/* const categoryList = new CategoryList()

categoryList.addCategory(cat1)
categoryList.addCategory(cat2)
categoryList.addCategory(cat3)

console.log(categoryList.categories)
categoryList.removeCategory(cat1.id)
console.log(categoryList.categories) */
