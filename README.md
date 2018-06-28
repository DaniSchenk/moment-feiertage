# moment-feiertage
moment-feiertage is a [Moment.js](http://momentjs.com/) plugin to determine if a date is a german holiday. Holidays are taken from [Wikipedia (de)](https://de.wikipedia.org/wiki/Gesetzliche_Feiertage_in_Deutschland). Feel free to contribute!

## How to use?
1. Add moment-feiertage to your package.json by runing `npm install moment-feiertage --save`
2. Import moment and moment-feiertage
    ```javascript
    // ES6
    import moment from 'moment'
    import 'moment-feiertage'

    // node
    const moment = require('moment');
    const { isHoliday } = require('moment-feiertage');
    ````
3. `isHoliday()` on any moment object is returning `false` (boolean) or name of holiday (string)

## Examples
```javascript
/**
 * isHoliday() checks if moment object is a german holiday in all states.
 * isHoliday('<state code>') checks if moment object is a german holiday in specific state)
 * @param {string} input any state code
 * @returns {boolean|string} false | name of holiday
 */

const someDateIsHoliday = moment('2019-12-25').isHoliday();
// returns '1. Weihnachtsfeiertag' - is holiday in all states

const isHolidayInAllStates = moment('2017-08-15').isHoliday();
// returns false - is not holiday in all states

const isHolidayInBavaria = moment('2017-08-15').isHoliday('BY');
// returns false - is not holiday in BY

const isHolidayInSaarland = moment('2017-08-15').isHoliday('SL');
// returns 'Mariä Himmelfahrt' - is holiday in SL

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
