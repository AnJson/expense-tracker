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

Det här kapitlet har påverkat min kod genom att specificera explicita datastrukturer för tex kostnad(Cost), kategori(Category) och namn på veckodag(DayName) för att inte använda primitiva datatyper som integer eller string. Detta har gjort att jag lättare kan validera att det är en korrekt kostnad som läggs till i en utgift(Expense). Kedjan går hela vägen från kostnad till vecka(Week), en vecka består av en lista med dagar(DayList), som i sin tur består av dagar(Day), där varje dag består av ett namn(DayName) och en lista av utgifter(ExpenseList), som i sin tur består av utgifter(Expense) som i sin tur består av en kostnad(Cost) och en kategori(Category).

Jag följer också **Law of demeter** genom att bara låta metoder i en klass anropa sina kända objekt. I exemplet nedan ser vi hur jag i klassen `Week` kan få ut veckans totala costnad genom att bara anropa `getTotalCost` på den privata medlemsvariabeln `#dayList`. `DayList` loopar då igenom alla sina dagar och anropar metoden `getTotalCost` på varje `Day`. `Day` anropar då metoden `getTotalCost` på sin privata `ExpenseList`. I sin tur loopar då `ExpenseList` igenom alla `Expense` som den innehåller och anropar `getCostValue`. `Expense` läser då attributet value på sin privata `Cost` medlem.

Det börjar i Week.js som håller `DayList`-objektet:

```javascript
getTotalCost () {
  const totalCost = this.#dayList.getTotalCost()
  return totalCost
}
```

Och slutar i Expense.js som håller `Cost`-objektet.

```javascript
getCostValue () {
  return this.#cost.value
}
```

### Error handling 

Felhanteringskapitlet har egentligen inte påverkat min kod så mycket. Sedan tidigare i utbildningen har vi jobbat med exceptions och det kändes självklart att validera data i konstruktor på klassen vilket tas upp som ett bra sätt att göra. På så sätt vet jag att om det kommer in ett `Cost`-objekt till konstruktorn på `Expense` så vet jag att kostnaden är ett positivt nummer, för det har konstruktorn i `Cost` redan kollat, jag behöver alltså inte kolla det i `Expense` också. Men eftersom javascript inte är ett typat språk så behöver jag validera att det är ett `Cost`-objekt som kommer in. 

Kod i `Expense`:

```javascript
constructor (category, cost, id = nanoid()) {
    this.#validator.validateCategory(category)
    this.#validator.validateCost(cost)
    ...
```

Kod i `Validator.js`:

```javascript
validateCost (cost) {
  if (!(cost instanceof Cost)) {
    throw new TypeError('Expected a cost to be of type Cost.')
  }
}
```


### Boundaries 

Jag har satt en boundary vid gränser för vad jag känner till om hur och vart jag ska lagra data persistent. Jag har i appen inte någon persistent lagring utan det är bara en lagring som lever under sessionen. Här har jag implementerat ett slags interface(som inte finns i javascript) för att ladda och spara från en "databas" som en boundary för att kunna jobba ovetandes HUR eller VART det laddas och sparas innanför den gränsen. Det gör det lättare att kunna bygga en lagring på andra sidan den gränsen utan att behöva ändra på den kod jag redan skrivit på insidan.

Hantering av kategorier applicerar detta "interface" så att jag kan hämta de kategorier som finns (i detta fallet hårdkodade i sessionen, men det behöver jag inte veta när jag kodar på insidan):

```javascript
export class CategoryPersistance {
  #validator = new Validator()

  save (category, id = nanoid()) {
    this.#validator.validateCategory(category)
    categoryDB[id] = category
  }

  get (id) {
    const category = categoryDB[id]

    return category
  }

  getAll () {
    const allCategories = { ...categoryDB }

    return allCategories
  }
}
```

### Unit tests 
...

### Classes 
...

### Systems 
...


