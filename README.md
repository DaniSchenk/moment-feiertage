# moment-feiertage
moment-feiertage is a [Moment.js](http://momentjs.com/) plugin to determine if a date is a german holiday. Holidays are taken from [Wikipedia (de)](https://de.wikipedia.org/wiki/Gesetzliche_Feiertage_in_Deutschland). Feel free to contribute!

## How to use?
1. Add moment-feiertage to your package.json by running `npm install moment-feiertage --save`. Moment.js is a peer dependency, so don't forget to install it, if you haven't already.
2. Import `moment` from moment-feiertage like you would from the original Moment.js package. moment-feiertage exports the original moment object with extended functionality.
```javascript
// Typescript
import * as moment from 'moment-feiertage';

// node
const moment = require('moment-feiertage');
```
3. Check the examples below for functionality, supported arguments and return values.
- getAllStateCodes()
- getHolidaysByYear()
- isHoliday() Array support
- isHoliday()
- [state codes](#State-codes)
- [contribute](#Contribute)

## getAllStateCodes()
since 2.0.0
```javascript
const codes = moment.getAllStateCodes();
/* returns ['BW','BY','BE','BB','HB','HH','HE','MV','NI','NW','RP','SL','SN','ST','SH','TH']*/
```

## getHolidaysByYear(year: number)
since 2.0.0

Returns an object containing all holidays of a year. Every holiday has a `date` and a `state` property. `date` is holding a moment object representing the holidays date. It's a nationwide holiday, if the `state` value is an empty Array.
```javascript
const codes = moment.getHolidaysByYear(2020);
/* returns {
  'Neujahrstag': {
    date: moment('2020-01-01'),
    state: [] // nationwide holiday
  },
  'Heilige Drei Könige': {
    date: moment('2020-01-06')
    state: ['BW', 'BY', 'ST'] // only these states celebrate
  },
  [ ... ]
} */
```

## isHoliday(states: Array<string>)
since 1.1.0

From version `1.1.0` on `isHoliday()` supports Arrays. Pass an empty Array to test against all states, or pass an Array of state codes (e.g. `['BY', 'SH']`). The return value is an Object:
```javascript
{
  allStates: boolean, // default false
  holidayName: string, // default: ''
  holidayStates: Array<string>, // default: []
  testedStates: Array<string> // default: ...allStates
}
```

- `allStates` is `true`, if the checked date is a nationwide holiday, even if not all states are checked because of the `states` param.
- `holidayName` contains the name of the holiday
- `holidayStates` contains the states, where this holiday is celebrated. If `states` param is provided, `holidayStates` contains only a subset of `states`
- `testedStates` is the same as the `states` param. If `states` param is `[]`, isHoliday will check against all states by default

```javascript
const christmasInAllStates = moment('2018-11-01').isHoliday([]);
/* returns {
  allStates: true,
  holidayName: '1. Weihnachtsfeiertag',
  holidayStates: ...allStates,
  testedStates: ...allStates
}*/
const christmasInSomeStates = moment('2018-11-01').isHoliday(['BW', 'SH']);
/* returns {
  allStates: true,
  holidayName: '1. Weihnachtsfeiertag',
  holidayStates: [ 'BW', 'SH' ],
  testedStates: [ 'BW', 'SH' ]
}*/
const someDateInAllStates = moment('2018-11-01').isHoliday([]);
/* returns {
  allStates: false,
  holidayName: 'Allerheiligen',
  holidayStates: [ 'BW', 'BY', 'NW', 'RP', 'SL' ],
  testedStates: ...allStates
}*/
const noHolidayDateInAllStates = moment('2018-12-12').isHoliday([]);
/* returns {
  allStates: false,
  holidayName: '',
  holidayStates: [],
  testedStates: ...allStates
}*/
```

## isHoliday(state?: string)
since 1.0.0

Since version `1.0.0` `isHoliday()` checks if there's a holiday at a moment object. A state code can be provided optionally.

```javascript
const nowIsHoliday = moment().isHoliday();
// returns name of holiday (string) if date is a holiday
// retruns false (boolean) if date is not a holiday

const someDateIsHoliday = moment('2019-12-25').isHoliday();
// returns '1. Weihnachtsfeiertag' - is a holiday in all states

const isHolidayInAllStates = moment('2017-08-15').isHoliday();
// returns false - is not a holiday in all states

const isHolidayInBavaria = moment('2017-08-15').isHoliday('BY');
// returns false - is not a holiday in BY

const isHolidayInSaarland = moment('2017-08-15').isHoliday('SL');
// returns 'Mariä Himmelfahrt' - is a holiday in SL
```
## State codes
```
BW = Baden-Württemberg
BY = Bayern
BE = Berlin
BB = Brandenburg
HB = Bremen
HH = Hamburg
HE = Hessen
MV = Mecklenburg-Vorpommern
NI = Niedersachsen
NW = Nordrhein-Westfalen
RP = Rheinland-Pfalz
SL = Saarland
SN = Sachsen
ST = Sachsen-Anhalt
SH = Schleswig-Holstein
TH = Thüringen
```

### Mappings
- Google Places Api: https://github.com/DaniSchenk/moment-feiertage/issues/17#issuecomment-780445461 provided by [@t-wark9](https://github.com/t-wark)

# Contribute
1. fork
2. `npm install` and add your desired version of Moment.js: `npm install moment --no-save`
3. code
4. `npm run build`: linting, formating, building, testing
5. PR
