# moment-feiertage
moment-feiertage is a [Moment.js](http://momentjs.com/) plugin to determine if a date is a German holiday. Holidays are taken from [Wikipedia (de)](https://de.wikipedia.org/wiki/Gesetzliche_Feiertage_in_Deutschland).

## How to use?
1. Add moment-feiertage to your package.json by running `npm install moment-feiertage --save`
2. Import moment and moment-feiertage
```javascript
// ES6
import moment from 'moment'
import 'moment-feiertage'

// node
const moment = require('moment');
const { isHoliday } = require('moment-feiertage');
````
3. call `isHoliday()` on any moment object. Check examples for supported arguments and return values

## Examples since version 1.1.0
From version `1.1.0` on `isHoliday()` supports Arrays. Pass an empty Array to test agains all states, or pass an Array of state codes (e.g. `['BY', 'SH']`) to test agains passed states. The return value is an Object:
```javascript
{
  allStates: boolean, // true if holiday in all 16 states (default: false)
  holidayName: string, // name of holiday (default: '')
  holidayStates: Array<string>, // states, which celebrate this holiday (default: [])
  testedStates: Array<string> // tested states default: ['BW','BY','BE','BB','HB','HH','HE','MV','NI','NW','RP','SL','SN','ST','SH','TH']
}
```

Tests Christmas in all states and all states celebrate this holiday:
```javascript
const christmasInAllStates = moment('2018-12-25').isHoliday([]);
/* returns {
  allStates: true,
  holidayName: '1. Weihnachtsfeiertag',
  holidayStates: ...allStates,
  testedStates: ...allStates
}*/
```

Tests some holiday in all states but not all states celebrate this holiday:
```javascript
const someDateInAllStates = moment('2018-11-01').isHoliday([]);
/* returns {
  allStates: false,
  holidayName: 'Allerheiligen',
  holidayStates: [ 'BW', 'BY', 'NW', 'RP', 'SL' ],
  testedStates: ...allStates
}*/
```

Tests multiple states for a holiday. This checks if the passed states celebrate this holiday:
```javascript
const someDateInSomeStates = moment('2018-11-01').isHoliday(['BW', 'SH', 'TH']);
/* returns {
  allStates: false,
  holidayName: 'Allerheiligen',
  holidayStates: [ 'BW' ],
  testedStates: [ 'BW', 'SH', 'TH' ]
}*/
```

Tests some date in all states and no state is celebrating this date:
```javascript
const someDateInAllStates = moment('2018-12-12').isHoliday([]);
/* returns {
  allStates: false,
  holidayName: '',
  holidayStates: [],
  testedStates: ...allStates
}*/
```

## Working Examples since version `1.0.0`
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

// state codes:
// BW = Baden-Württemberg
// BY = Bayern
// BE = Berlin
// BB = Brandenburg
// HB = Bremen
// HH = Hamburg
// HE = Hessen
// MV = Mecklenburg-Vorpommern
// NI = Niedersachsen
// NW = Nordrhein-Westfalen
// RP = Rheinland-Pfalz
// SL = Saarland
// SN = Sachsen
// ST = Sachsen-Anhalt
// SH = Schleswig-Holstein
// TH = Thüringen
```