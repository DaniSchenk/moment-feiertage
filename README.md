# moment-feiertage
moment-feiertage is a [Moment.js](http://momentjs.com/) plugin to determine if a date is a german holiday.

## How to use?
1. Add moment-feiertage to your package.json by runing `npm install moment-feiertage --save`
2. `isHoliday()` on any moment object is returning a boolean
3. ES6: add `import 'moment-feiertage'` after `import moment from 'moment'`

## Examples
```javascript
const moment = require('moment');
const { isHoliday } = require('moment-feiertage');

const nowIsHoliday = moment().isHoliday();
const someDateIsHoliday = moment('2019-12-25').isHoliday();
const isHolidayInBavaria = moment('2017-08-15').isHoliday('BY');

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