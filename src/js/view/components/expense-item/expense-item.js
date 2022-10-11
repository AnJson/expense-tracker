export const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-size: inherit;
    }

    .expense-list__item {
      display: flex;
      justify-content: space-between;
    }
  </style>
  <li class="expense-list__item">
    <span id="category"></span>
    <span id="cost"></span>
  </li>
  `

customElements.define(
  'expense-item',
  class extends HTMLElement {
    #categoryElement
    #costElement

    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(
        template.content.cloneNode(true)
      )

      this.#categoryElement = this.shadowRoot.querySelector('#category')
      this.#costElement = this.shadowRoot.querySelector('#cost')
    }

    static get observedAttributes () {
      return ['category', 'cost']
    }

    attributeChangedCallback (name, oldVal, newVal) {
      if (oldVal !== newVal) {
        if (name === 'category') {
          this.#categoryElement.textContent = newVal
        }

        if (name === 'cost') {
          this.#costElement.textContent = newVal
        }
      }
    }
  })
