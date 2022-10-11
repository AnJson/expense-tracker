
export class TemporaryPersistance {
  #dbPrefix = 'exptr-'

  save () {
    // TODO: Save list in localstorage.
  }

  get (id) {
    const currentWeekString = window.localStorage.getItem(`${this.#dbPrefix}${id}`)
    let currentWeek = null

    if (currentWeekString !== null) {
      currentWeek = JSON.parse(currentWeekString)
    }

    return currentWeek
  }
}
