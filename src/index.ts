import moment = require('moment');
export = moment;

const allStates: Array<string> = [
  'BW',
  'BY',
  'BE',
  'BB',
  'HB',
  'HH',
  'HE',
  'MV',
  'NI',
  'NW',
  'RP',
  'SL',
  'SN',
  'ST',
  'SH',
  'TH',
];
const allHolidays: YearWithHolidays = {};

interface IsHolidayResult {
  allStates: boolean;
  holidayName: string;
  holidayStates: Array<string>;
  testedStates: Array<string>;
}
interface Holiday {
  date: moment.Moment;
  state: Array<string>;
}
interface Holidays {
  [key: string]: Holiday;
}
interface YearWithHolidays {
  [key: string]: Holidays;
}

declare module 'moment' {
  export interface Moment {
    isHoliday: (
      _states?: string | Array<string>
    ) => boolean | string | IsHolidayResult;
  }
  export function getHolidaysByYear(_year: number): Holidays;
  export function getAllStateCodes(): Array<string>;
}

const getAllStateCodes = function(): Array<string> {
  return allStates;
};

const isHoliday = function(
  this: moment.Moment,
  _states?: string | Array<string>
): boolean | string | IsHolidayResult {
  const _moment = this;

  // calculate holidays if needed
  if (
    !Object.prototype.hasOwnProperty.call(
      allHolidays,
      _moment.year().toString()
    )
  ) {
    allHolidays[_moment.year().toString()] = calculateHolidays(_moment.year());
  }

  // call backwards compatible function
  if (typeof _states === 'string' || !_states) {
    return _isHoliday106(_moment, _states);
  }
  // return IsHolidayResult if _states parma is Array
  if (Array.isArray(_states)) {
    return _isHoliday(_moment, _states);
  }

  // TODO: return error
  return false;
};

const getHolidaysByYear = (_year: number): Holidays => {
  if (!Object.prototype.hasOwnProperty.call(allHolidays, _year.toString())) {
    return calculateHolidays(_year);
  }
  return allHolidays[_year.toString()];
};

// add custom functions to moment
(moment as any).fn.isHoliday = isHoliday;
(moment as any).getHolidaysByYear = getHolidaysByYear;
(moment as any).getAllStateCodes = getAllStateCodes;

const _isHoliday106 = (
  _moment: moment.Moment,
  _state?: string
): string | boolean => {
  if (
    Object.prototype.hasOwnProperty.call(
      allHolidays,
      _moment.year().toString()
    ) &&
    allHolidays[_moment.year().toString()]
  ) {
    const holidays = allHolidays[_moment.year().toString()];
    for (const h in holidays) {
      // test if moment is holiday
      if (_moment.isSame(holidays[h].date, 'day')) {
        // return name if all states celebrate this holiday
        if (holidays[h].state.length === 0) {
          return h;
        } else {
          // return name if passed state celebrates holiday
          if (_state && holidays[h].state.indexOf(_state) > -1) {
            return h;
          } else {
            // return false if passed state does not celebrate holiday
            return false;
          }
        }
      }
    }
  }
  return false;
};

const _isHoliday = (
  _moment: moment.Moment,
  _states: Array<string>
): IsHolidayResult => {
  const result: IsHolidayResult = {
    allStates: false,
    holidayName: '',
    holidayStates: [],
    testedStates: [],
  };

  // test in all states if _states is empty
  if (_states && _states.length < 1) {
    result.testedStates = allStates;
  } else {
    // validate state codes from params
    const validStateCodes = validateStateCodes(_states);
    result.testedStates = validStateCodes;
  }

  // test multiple state codes
  for (const s of result.testedStates) {
    const holiday = _isHoliday106(_moment, s);
    if (holiday && typeof holiday === 'string') {
      result.holidayStates.push(s);
      result.holidayName = holiday;
    }
  }

  // test for nation wide holiday
  const nationHoliday = _isHoliday106(_moment);
  if (nationHoliday && typeof nationHoliday === 'string') {
    result.allStates = true;
    result.holidayName = nationHoliday;
  }

  return result;
};

const validateStateCodes = (_states: Array<string>): Array<string> => {
  // sort out false values
  let validCodes: Array<string> = [];
  for (const s of _states) {
    if (s && allStates.indexOf(s) > -1) {
      validCodes.push(s);
    }
  }
  // remove duplicates
  validCodes = validCodes.filter((item, i) => validCodes.indexOf(item) === i);

  return validCodes;
};

const calculateHolidays = (year: number): Holidays => {
  const easter = calculateEasterDate(year);
  const holidays: Holidays = {
    Neujahrstag: {
      date: moment(`${year}-01-01`),
      state: [],
    },
    'Heilige Drei Könige': {
      date: moment(`${year}-01-06`),
      state: ['BW', 'BY', 'ST'],
    },
    Karfreitag: {
      date: moment(`${easter}`).subtract(2, 'days'),
      state: [],
    },
    Ostersonntag: {
      date: moment(`${easter}`),
      state: ['BB'],
    },
    Ostermontag: {
      date: moment(`${easter}`).add(1, 'days'),
      state: [],
    },
    Maifeiertag: {
      date: moment(`${year}-05-01`),
      state: [],
    },
    'Christi Himmelfahrt': {
      date: moment(`${easter}`).add(39, 'days'),
      state: [],
    },
    Pfingstsonntag: {
      date: moment(`${easter}`).add(49, 'days'),
      state: ['BB'],
    },
    Pfingstmontag: {
      date: moment(`${easter}`).add(50, 'days'),
      state: [],
    },
    Fronleichnam: {
      date: moment(`${easter}`).add(60, 'days'),
      state: ['BW', 'BY', 'HE', 'NW', 'RP', 'SL'],
    },
    'Mariä Himmelfahrt': {
      date: moment(`${year}-08-15`),
      state: ['SL'],
    },
    'Tag der deutschen Einheit': {
      date: moment(`${year}-10-03`),
      state: [],
    },
    Reformationstag: {
      date: moment(`${year}-10-31`),
      state: ['BB', 'MV', 'SN', 'ST', 'TH'],
    },
    Allerheiligen: {
      date: moment(`${year}-11-01`),
      state: ['BW', 'BY', 'NW', 'RP', 'SL'],
    },
    'Buß- und Bettag': {
      date: calculateBandBDate(year),
      state: ['SN'],
    },
    '1. Weihnachtsfeiertag': {
      date: moment(`${year}-12-25`),
      state: [],
    },
    '2. Weihnachtsfeiertag': {
      date: moment(`${year}-12-26`),
      state: [],
    },
  };

  // EXCEPTIONS and ADDITIONS
  // 2017 Reformationstag is holiday in all states
  if (+year === 2017) {
    holidays['Reformationstag'].state = [];
  }
  // since 2018 HB, HH, NI, SH celebrate 'Reformationstag' as well
  if (+year > 2017) {
    holidays['Reformationstag'].state = [
      'BB',
      'HB',
      'HH',
      'MV',
      'NI',
      'SN',
      'ST',
      'SH',
      'TH',
    ];
  }
  // since 2019 new holidays
  if (+year > 2018) {
    holidays['Internationaler Frauentag'] = {
      date: moment(`${year}-03-08`),
      state: ['BE'],
    };
    holidays['Weltkindertag'] = {
      date: moment(`${year}-09-20`),
      state: ['TH'],
    };
  }
  // one time only holiday in Berlin
  if (year == 2020) {
    holidays['Tag der Befreiung'] = {
      date: moment(`${year}-05-08`),
      state: ['BE'],
    };
  }

  return holidays;
};

const calculateEasterDate = (Y: number): string => {
  const C = Math.floor(Y / 100);
  const N = Y - 19 * Math.floor(Y / 19);
  const K = Math.floor((C - 17) / 25);
  let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
  I = I - 30 * Math.floor(I / 30);
  // prettier-ignore
  I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
  let J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
  J = J - 7 * Math.floor(J / 7);
  const L = I - J;
  const M = 3 + Math.floor((L + 40) / 44);
  const D = L + 28 - 31 * Math.floor(M / 4);

  return `${Y}-${padout(M)}-${padout(D)}`;
};
const padout = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

const calculateBandBDate = function(year: number): moment.Moment {
  for (let i = 1; i < 8; i++) {
    const day = moment(`${year}-11-23`).subtract(i, 'days');
    if (day.isoWeekday() === 3) {
      return day;
    }
  }
  return moment.invalid();
};
