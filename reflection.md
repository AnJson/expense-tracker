# Reflektioner

## Clean Codes påverkan på min kod

.................

.................

.................

### Meaningful names

Bokens kapitel om namngivning har påverkat mig i mitt kodande på ett sätt som gör att när jag döper variabler, metoder och klasser så funderar jag på att jag ska förklara så att det går att förstå syftet, men ändå med ett så kort namn som möjligt genom att ta bort noisewords eller lägga till ett context(add meaningful context).

Här går readability lite i konflikt med understandability, det blir gärna långa namn med camel-case notering som inte är bra för readability. Men understandability när det gäller vad syftet med koden är går upp.

Här har jag contextet StatsCollection och refaktorerade till ett till synes noiseword som "data", men i konceptet `StatsCollection` så får "StatsCollection.data" en innebörd, att det är själva datat i StatsCollection. I sammanhanget StatsCollection blir namnet "collectionOfData" redundant (StatsCollection.collectionOfData).

Här tycker jag alltså att jag lyckades få till det så att både readability och understandability att gick upp.

(Exemplet är från enhetstest i L1 modulen.)

Före:

```javascript
it('accessing collectionOfData-property should return a copy of the original data', () => {
  const data = [10, 12]
  const statsCollection = new StatsCollection(data)
  expect(statsCollection.collectionOfData).not.toBe(data)
})
```

Efter:

```javascript
it('accessing data-property should return a copy of the original data', () => {
  const data = [10, 12]
  const statsCollection = new StatsCollection(data)
  expect(statsCollection.data).not.toBe(data)
})
```

### Functions 

Functions-kapitlet är kanske det kapitel som har påverkat mig mest. Tidigare hade jag funktioner som gjorde mer än de lovade, det var funktioner som gjorde betydligt mer än EN sak och hade ibland flera sidoeffekter. Här har jag börjat bryta ut delarna i funktioner till egna mindre funktioner som gör endast den uppgiften. Att tänka på Do one thing, tillsammans med att endast ha en nivå av indentering(Blocks and indenting) har gjort att funktionerna blir kortare, de får ett namn som beskriver precis vad de gör och abstraktionsnivån blir hög på publika metoder.

(Exemplet är publik metod i vyns WeekView-klass.)

```javascript
showCurrentWeek () {
  if (this.#currentWeek) {
    this.#setWeekHeading()
    this.#setWeekTotal()
    this.#renderWeekdays(this.#currentWeek.dayList.days)
  }
}
```

### Comments 

Efter att ha läst bokens syn på kommentarer så har jag både minskat antalet kommentarer och "dokumentarer" med säkert 90%, jag har dessutom ökat understandability i koden genom att skriva kod som förklarar sig själv(explain yourself in the code). På de ställen jag har kommentarer så försöker jag berätta något som kanske inte är självklart bara av att läsa tex namnet på en metod, något som andra programmerare behöver veta om metoden(Informative comments), till exempel att instanseringen av en klass med felaktiga argument faktiskt kastar ett undantag.

Här är ett exempel på en kommentar som förtydligar att objektet fungerar som en enum(Clarification).

(Exemplet är från DayList i model-paketet.)

```javascript
/**
 * Enum with unique symbols as values to make sure that comparing is only equal to the enum-value.
 * E.g (DayName.Monday === DayName.Monday, 'monday' !== DayName.Monday)
 *
 */
export const DayName = Object.freeze({
  Monday: Symbol('monday'),
  Tuesday: Symbol('tuesday'),
  Wednesday: Symbol('wednesday'),
  Thursday: Symbol('thursday'),
  Friday: Symbol('friday'),
  Saturday: Symbol('saturday'),
  Sunday: Symbol('sunday')
})
```

### Formatting 

När det gäller generell formattering som tex horisontella avstånd och indentering så gör jag som boken säger och följer "teamets" regler genom att rätta mig efter ESLint-regler som tex säger att indentering är 2 spaces och ett mellanslag ska vara mellan metodnamn och öppnings-parantes.

I strukturerandet, och omstrukturerandet av min kod har formateringens regler som Vertical density, Vertical distance och Conceptual affinity påverkat hur jag ordnar metoderna i en klass vertikalt.
Jag lägger publik metod över de (oftast privata)metoder som den använder sig av, samtidigt som jag försöker lägga de publika metoder som har ett gemensamt sammanhang bredvid varandra. Här blir det en konflikt och jag har valt att lägga metoderna med Conceptual affinity närmast varandra följt av de privata metoderna som de använder under, så att den första publika metodens privat "callees" kommer överst av dessa.

Här är ett exempel på detta från CategoryList i model:

```javascript
addCategory (category) {
  this.#validator.validateCategory(category)
  this.#categories.push(category)
  this.#incrementLength()
}

removeCategory (id) {
  const category = this.#getCategoryById(id)

  if (this.#categoryFound(category)) {
    this.#deleteCategory(category)
  }
}

#incrementLength () {
  this.#length++
}

#getCategoryById (id) {
  return this.#categories.filter(category => category.id === id)[0]
}

#categoryFound (category) {
  return category !== undefined
}

#deleteCategory (category) {
  this.#categories.splice(this.#categories.indexOf(category), 1)
}
```

### Objects and Datastructures 
...

### Error handling 

Felhanteringskapitlet har egentligen inte påverkat min kod så mycket. Exempel på att kategorisera exeptions i en wrapper-klass som kastar en gemensam typ av undantag fungerar inte i javascript. Wrapper-klass kan jag skapa men det går inte att fånga en specific typ av exeption på samma sätt som i tex Java. Det jag har gjort är att försöka samla alla undantag som kastas i en gemensam klass som sköter validering och kastandet av undantag.

```javascript
export class Validator {
  validateExpenseTracker (model) {
    if (!(model instanceof ExpenseTracker)) {
      throw new TypeError('The model must be an instance of ExpenseTracker.')
    }
  }
...
```

### Boundaries 
...

### Unit tests 
...

### Classes 
...

### Systems 
...


