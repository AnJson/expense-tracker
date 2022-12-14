import { template } from './template.js'
import '../expense-item'
import { Expense } from '../../../model/domain/Expense.js'
import { Category } from '../../../model/domain/Category.js'
import { Cost } from '../../../model/domain/Cost.js'
import { Validator } from '../../../model/domain/validation/Validator.js'

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
    #validator = new Validator()
    #day
    #options

    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(
        template.content.cloneNode(true)
      )
      this.#addShadowRootReferences()
      this.#addEventListeners()
    }

    #addShadowRootReferences () {
      this.#nameElement = this.shadowRoot.querySelector('#name')
      this.#dateElement = this.shadowRoot.querySelector('#date')
      this.#expensesElement = this.shadowRoot.querySelector('#expenses')
      this.#addExpenseButton = this.shadowRoot.querySelector('#add-button')
      this.#expenseFormElement = this.shadowRoot.querySelector('#expense-form')
      this.#costInputElement = this.shadowRoot.querySelector('#cost-input')
      this.#categorySelectElement = this.shadowRoot.querySelector('#category-select')
      this.#saveExpenseButton = this.shadowRoot.querySelector('#save-expense')
      this.#totalCostElement = this.shadowRoot.querySelector('#total-cost')
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

    #addButtonClickHandler () {
      this.#toggleFormVisible()
    }

    #toggleFormVisible () {
      this.#addExpenseButton.textContent === 'Ny utgift' ? this.#addExpenseButton.textContent = '??ngra' : this.#addExpenseButton.textContent = 'Ny utgift'
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

    #formIsValid () {
      const costValue = this.#costInputElement.value.trim()

      return (costValue !== '' && !Number.isFinite(costValue)) && costValue >= 0
    }

    #emitAddedExpenseEvent (category, cost) {
      this.dispatchEvent(new CustomEvent('expense-added', {
        detail: {
          category,
          cost
        }
      }))
    }

    renderDay () {
      if (this.#day) {
        this.#nameElement.textContent = this.#day.name
        this.#dateElement.textContent = this.#day.number
        this.#renderExpenses()
        this.#renderOptions()
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

    #renderOptions () {
      for (const category of this.#options) {
        const option = document.createElement('option')
        option.setAttribute('value', category.name)
        option.textContent = category.name

        this.#categorySelectElement.appendChild(option)
      }
    }

    setOptions (categories) {
      this.#validator.validateCategories(categories)
      this.#options = categories
    }

    setDay (day) {
      this.#validator.validateDay(day)
      this.#day = day
    }
  })
