export class WeekView {
  #dayListDOMReference
  #overviewSectionDOMReference
  #weekHeadingDOMReference
  #weekTotalDOMReference
  #daysButtonDOMReference
  #overviewButtonDOMReference

  constructor (dayListRef, overviewSection, weekHeadingRef, weekTotalRef, daysButtonRef, overviewButtonRef) {
    this.#dayListDOMReference = dayListRef
    this.#overviewSectionDOMReference = overviewSection
    this.#weekHeadingDOMReference = weekHeadingRef
    this.#weekTotalDOMReference = weekTotalRef
    this.#daysButtonDOMReference = daysButtonRef
    this.#overviewButtonDOMReference = overviewButtonRef
    this.#addToggleViewButtonsEventlisteners()
    Object.freeze(this)
  }

  #addToggleViewButtonsEventlisteners () {
    this.#daysButtonDOMReference.addEventListener('click', () => this.#handleShowWeekdays())
    this.#overviewButtonDOMReference.addEventListener('click', () => this.#handleShowOverview())
  }

  setWeekHeading (number) {
    this.#weekHeadingDOMReference.textContent = `Vecka ${number}`
  }

  setWeekTotal (total) {
    this.#weekTotalDOMReference.textContent = `Totalt: ${total}`
  }

  renderWeekdays (days) {
    console.log(days)
  }

  #handleShowWeekdays () {
    if (!this.#daysButtonDOMReference.hasAttribute('disabled')) {
      this.#toggleViewButtonsDisabled(this.#overviewButtonDOMReference, this.#daysButtonDOMReference)

      this.#overviewSectionDOMReference.classList.add('hidden')
      this.#dayListDOMReference.classList.remove('hidden')
    }
  }

  #handleShowOverview () {
    if (!this.#overviewButtonDOMReference.hasAttribute('disabled')) {
      this.#toggleViewButtonsDisabled(this.#daysButtonDOMReference, this.#overviewButtonDOMReference)

      this.#dayListDOMReference.classList.add('hidden')
      this.#overviewSectionDOMReference.classList.remove('hidden')
    }
  }

  #toggleViewButtonsDisabled (enabled, disabled) {
    disabled.setAttribute('disabled', true)
    disabled.classList.remove('btn__main--inactive')

    enabled.removeAttribute('disabled')
    enabled.classList.add('btn__main--inactive')
  }
}
