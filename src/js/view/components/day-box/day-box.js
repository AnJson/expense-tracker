import { Day } from '../../../model/domain/Day.js'
import { template } from './template.js'

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

    #options

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
    }

    renderDay (day) {
      this.#validateDay(day)
      this.#nameElement.textContent = day.name
      this.#dateElement.textContent = day.number
      this.#totalCostElement.textContent = day.getTotalCost().toString()
      this.#renderExpenses(day.getExpenses())
    }

    #validateDay (day) {
      if (!(day instanceof Day)) {
        throw new TypeError('Day to render must be an instance of Day.')
      }
    }

    #renderExpenses (expenses) {
      for (const expense of expenses) {
        console.log(expense.category + ' : ' + expense.cost) // NOTE: Remove this.
      }
    }
  })
