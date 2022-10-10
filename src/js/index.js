import { Category } from './model/domain/Category.js'
// import { CategoryList } from './model/domain/CategoryList.js'
import { Cost } from './model/domain/Cost.js'
import { Day } from './model/domain/Day.js'
import { DayName } from './model/domain/DayName.js'
import { Expense } from './model/domain/Expense.js'
import { ExpenseList } from './model/domain/ExpenseList.js'

// --------------------------------------
// Testing Expenses.
// --------------------------------------

// Instanciate costs.
const payment1 = new Cost(25)
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

const monday = new Day(10, DayName.Monday, expenseList)

console.log(monday)

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
