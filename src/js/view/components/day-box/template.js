export const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-size: 10px;
    }

    *,
    *::after,
    *::before {
      box-sizing: border-box;
    }

    h1,
    h2,
    h3,
    h4 {
      font-weight: 200;
      margin: 0;
    }

    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 2.6rem;
    }

    h3 {
      font-size: 2.2rem;
    }

    h4 {
      font-size: 1.8rem;
    }

    .btn {
      border: none;
      border-radius: 3px;
      background: none;
      cursor: pointer;
    }

    .btn__main {
      padding: 1rem 2rem;
      background-color: var(--color-cta);
      color: var(--textcolor-light);
    }

    .hidden {
      display: none !important;
    }
    
    .day-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 3px;
      background-color: rgb(252, 252, 252);
      border: 1px solid var(--color-main);
      overflow: hidden;
      width: 25rem;
    }

    .day-box__header {
      text-align: center;
      background-color: var(--color-main);
      color: var(--textcolor-light);
      padding: .6rem;
    }

    .day-box__content {
      padding: .7rem;
    }

    .expense-list {
      font-size: 1.6rem;;
      list-style-type: none;
      padding: 0;
      margin: 0;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }

    .expense-list__item {
      display: flex;
      justify-content: space-between;
    }

    .day-box__cta {
      width: 100%;
      padding: .5rem 0;
      background-color: var(--color-cta);
      color: var(--textcolor-light);
    }

    .expense-form {
      display: flex;
      flex-direction: column;
      margin: 2rem 0;
    }

    .expense-form__section {
      display: flex;
      border: none;
    }

    .expense-form label {
      display: flex;
      flex-direction: column;
      font-size: 1.3rem;
      gap: .3rem;
      width: 100%;
    }

    .expense-form__input {
      width: 100%;
      padding: .5rem;
      font-size: 1.2rem;
      border-radius: 3px;
      border: 2px solid var(--color-cta-active);
    }

    .expense-form__input:focus {
      outline: none;
      border: 2px solid var(--color-main);
    }

    .expense-form__select {
      width: 100%;
      padding: .5rem;
      font-size: 1.2rem;
      border: 2px solid var(--color-cta-active);
      cursor: pointer;
    }

    .expense-form__select:focus {
      outline: none;
      border: 2px solid var(--color-main);
    }

    .expense-form__submit {
      align-self: center;
    }

    .day-box__footer {
      display: flex;
      justify-content: space-between;
      padding: .5rem;
      font-size: 1.4rem;
      background-color: var(--color-main);
      color: var(--textcolor-light);
    }
  </style>
  <div id="day-one" class="day-box">
    <div class="day-box__header">
      <h4 id="name" class="day-box__title"></h4>
      <h4 id="date" class="day-box__title"></h4>
    </div>
    <div class="day-box__content">
      <ul id="expenses" class="expense-list">
        <!-- <li class="expense-list__item">
          <span class="expense-item__category">Bränsle</span>
          <span class="expense-item__cost">1223:-</span>
        </li>
        <li class="expense-list__item">
          <span class="expense-item__category">Matvaror</span>
          <span class="expense-item__cost">1050:-</span>
        </li> -->
      </ul>
      <button id="add-button" class="btn day-box__cta">Lägg till</button>
      <form id="expense-form" action="" class="expense-form hidden">
        <fieldset class="expense-form__section">
          <label for="cost">
            Belopp:
            <input id="cost-input" type="tel" name="cost" class="expense-form__input">
          </label>
        </fieldset>
        <fieldset class="expense-form__section">
          <label for="category">
            Välj kategori:
            <select id="category-select" name="category" class="expense-form__select">
              <option value="fuel">Bränsle</option>
              <option value="grocery">Matvaror</option>
            </select>
          </label>
        </fieldset>
        <button id="save-expense" class="btn btn__main expense-form__submit">Spara</button>
      </form>
    </div>
    <div class="day-box__footer">
      <span>Totalt:</span>
      <span id="total-cost"></span>
    </div>
  </div>
`
