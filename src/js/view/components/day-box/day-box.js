import { Day } from '../../../model/domain/Day.js'
import { template } from './template.js'
import '../expense-item'
import { Expense } from '../../../model/domain/Expense.js'
import { Category } from '../../../model/domain/Category.js'
import { Cost } from '../../../model/domain/Cost.js'

customElements.define(
  'day-box',
  class extends HTMLElement {
    #nameElement
    #dateElement
    #expensesElement
    #addExpenseButton
    #expenseFormElement
    #costInputElement
    #categorySelectElement
    #saveExpenseButton
    #totalCostElement

    #day
    #options // NOTE: Implement array of categories. Sent from controller that holds the CategoryList(?)

    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(
        template.content.cloneNode(true)
      )

      this.#nameElement = this.shadowRoot.querySelector('#name')
      this.#dateElement = this.shadowRoot.querySelector('#date')
      this.#expensesElement = this.shadowRoot.querySelector('#expenses')
      this.#addExpenseButton = this.shadowRoot.querySelector('#add-button')
      this.#expenseFormElement = this.shadowRoot.querySelector('#expense-form')
      this.#costInputElement = this.shadowRoot.querySelector('#cost-input')
      this.#categorySelectElement = this.shadowRoot.querySelector('#category-select')
      this.#saveExpenseButton = this.shadowRoot.querySelector('#save-expense')
      this.#totalCostElement = this.shadowRoot.querySelector('#total-cost')
      this.#addEventListeners()
    }

    #addEventListeners () {
      this.#addExpenseButton.addEventListener('click', event => {
        event.preventDefault()
        this.#addButtonClickHandler()
      })
      this.#saveExpenseButton.addEventListener('click', event => {
        event.preventDefault()
        this.#saveButtonClickHandler()
      })
    }

    setDay (day) {
      this.#validateDay(day)
      this.#day = day
    }

    #validateDay (day) {
      if (!(day instanceof Day)) {
        throw new TypeError('Day to render must be an instance of Day.')
      }
    }

    renderDay () {
      if (this.#day) {
        this.#nameElement.textContent = this.#day.name
        this.#dateElement.textContent = this.#day.number
        this.#renderExpenses()
      }
    }

    #renderExpenses () {
      const expenses = this.#day.getExpenses()
      this.#expensesElement.innerHTML = ''

      for (const expense of expenses) {
        const expenseItem = document.createElement('expense-item')
        expenseItem.setAttribute('category', expense.category)
        expenseItem.setAttribute('cost', expense.cost)
        this.#expensesElement.appendChild(expenseItem)
      }

      this.#totalCostElement.textContent = this.#day.getTotalCost().toString()
    }

    #addButtonClickHandler () {
      this.#toggleFormVisible()
    }

    #toggleFormVisible () {
      this.#addExpenseButton.textContent === 'Ny utgift' ? this.#addExpenseButton.textContent = 'Ångra' : this.#addExpenseButton.textContent = 'Ny utgift'
      this.#expenseFormElement.classList.toggle('hidden')
    }

    #saveButtonClickHandler () {
      if (this.#formIsValid()) {
        const category = new Category(this.#categorySelectElement.value)
        const cost = new Cost(Number.parseInt(this.#costInputElement.value))
        const expense = new Expense(category, cost)
        this.#day.addExpense(expense)
        this.#renderExpenses()
        this.#toggleFormVisible()
        this.#costInputElement.value = ''
        this.#emitAddedExpenseEvent(category, cost)
      }
    }

    #emitAddedExpenseEvent (category, cost) {
      this.dispatchEvent(new CustomEvent('expense-added', {
        detail: {
          category,
          cost
        }
      }))
    }

    #formIsValid () {
      const costValue = this.#costInputElement.value.trim()

      return (costValue !== '' && !Number.isFinite(costValue)) && costValue >= 0
    }
  })
