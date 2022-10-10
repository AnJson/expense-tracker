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
