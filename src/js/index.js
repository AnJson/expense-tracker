import { Category } from './model/domain/Category.js'
import { CategoryList } from './model/domain/CategoryList.js'
import { Expense } from './model/domain/Expense.js'
import { ExpenseList } from './model/domain/ExpenseList.js'

// --------------------------------------
// Testing Expenses.
// --------------------------------------

const expense1 = new Expense(25)
const expense2 = new Expense(125)
const expense3 = new Expense(75)

const expenseList = new ExpenseList()

expenseList.addExpense(expense1)
expenseList.addExpense(expense2)
expenseList.addExpense(expense3)

console.log(expenseList.expenses)

expenseList.removeExpense(expense1.id)

console.log(expenseList.expenses)

const totalExpenses = expenseList.getTotalExpense()

console.log(totalExpenses.toString())

// --------------------------------------
// Testing Expenses.
// --------------------------------------

const category1 = new Category('vilda västern')
const category2 = new Category('whatever')
const category3 = new Category('matvaror')

const categoryList = new CategoryList()

categoryList.addCategory(category1)
categoryList.addCategory(category2)
categoryList.addCategory(category3)

console.log(categoryList.categories)
categoryList.removeCategory(category1.id)
console.log(categoryList.categories)
