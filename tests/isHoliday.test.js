const moment = require('../build/index');
const allStates = moment.getAllStateCodes();

test('non holiday date', () => {
  expect(moment('2017-01-03').isHoliday()).toBe(false);
  expect(moment('2017-01-03').isHoliday([])).toStrictEqual({
    allStates: false,
    holidayName: '',
    holidayStates: [],
    testedStates: allStates
  });

  for (let s of allStates) {
    expect(moment('2017-01-03').isHoliday(s)).toBe(false);
    expect(moment('2017-01-03').isHoliday([s])).toStrictEqual({
      allStates: false,
      holidayName: '',
      holidayStates: [],
      testedStates: [s]
    });
  }
});

test('1. Weihnachtsfeiertag', () => {
  expect(moment('2019-12-25').isHoliday()).toBe('1. Weihnachtsfeiertag');
  expect(moment('2019-12-25').isHoliday([])).toStrictEqual({
    allStates: true,
    holidayName: '1. Weihnachtsfeiertag',
    holidayStates: allStates,
    testedStates: allStates
  });

  for (const s of allStates) {
    expect(moment('2019-12-25').isHoliday(s)).toBe('1. Weihnachtsfeiertag');
    expect(moment('2019-12-25').isHoliday([s])).toStrictEqual({
      allStates: true,
      holidayName: '1. Weihnachtsfeiertag',
      holidayStates: [s],
      testedStates: [s]
    });
  }
});

test('Reformationstag', () => {
  const before2017 = ['BB', 'MV', 'SN', 'ST', 'TH'];
  const after2017 = ['BB', 'HB', 'HH', 'MV', 'NI', 'SN', 'ST', 'SH', 'TH'];

  expect(moment('2016-10-31').isHoliday()).toBe(false);
  expect(moment('2017-10-31').isHoliday()).toBe('Reformationstag');
  expect(moment('2018-10-31').isHoliday()).toBe(false);

  expect(moment('2016-10-31').isHoliday([])).toStrictEqual({
    allStates: false,
    holidayName: 'Reformationstag',
    holidayStates: before2017,
    testedStates: allStates
  });
  expect(moment('2017-10-31').isHoliday([])).toStrictEqual({
    allStates: true,
    holidayName: 'Reformationstag',
    holidayStates: allStates,
    testedStates: allStates
  });
  expect(moment('2018-10-31').isHoliday([])).toStrictEqual({
    allStates: false,
    holidayName: 'Reformationstag',
    holidayStates: after2017,
    testedStates: allStates
  });

  for (const s of allStates) {
    let result = false;
    if (before2017.includes(s)) {
      result = 'Reformationstag';
    }
    expect(moment('2016-10-31').isHoliday(s)).toBe(result);
    result = false;
    if (after2017.includes(s)) {
      result = 'Reformationstag';
    }
    expect(moment('2018-10-31').isHoliday(s)).toBe(result);
  }
});

test('return objects', () => {
  expect(moment('2020-10-03').isHoliday([])).toStrictEqual({
    allStates: true,
    holidayName: 'Tag der deutschen Einheit',
    holidayStates: allStates,
    testedStates: allStates
  });

  expect(moment('2020-10-03').isHoliday(['BW', 'BY', 'BE'])).toStrictEqual({
    allStates: true,
    holidayName: 'Tag der deutschen Einheit',
    holidayStates: ['BW', 'BY', 'BE'],
    testedStates: ['BW', 'BY', 'BE']
  });

  expect(moment('2020-01-06').isHoliday([])).toStrictEqual({
    allStates: false,
    holidayName: 'Heilige Drei Könige',
    holidayStates: ['BW', 'BY', 'ST'],
    testedStates: allStates
  });

  expect(moment('2020-01-06').isHoliday(['BW', 'BY', 'BB', 'HB', 'HH'])).toStrictEqual({
    allStates: false,
    holidayName: 'Heilige Drei Könige',
    holidayStates: ['BW', 'BY'],
    testedStates: ['BW', 'BY', 'BB', 'HB', 'HH']
  });
});

test('invalid inputs', () => {
  // this is a valid input
  expect(moment('2020-01-01').isHoliday([])).toStrictEqual({
    allStates: true,
    holidayName: 'Neujahrstag',
    holidayStates: allStates,
    testedStates: allStates
  });

  // duplicate inputs
  expect(moment('2020-01-01').isHoliday(['BY', 'BY', 'BY', 'BW', 'BY'])).toStrictEqual({
    allStates: true,
    holidayName: 'Neujahrstag',
    holidayStates: ['BY', 'BW'],
    testedStates: ['BY', 'BW']
  });

  // invalid inputs
  expect(moment('2020-01-01').isHoliday(['bw', 'ABC', '', null, undefined, 12, -12, 0, false])).toStrictEqual({
    allStates: true,
    holidayName: 'Neujahrstag',
    holidayStates: [],
    testedStates: []
  });
});

test('Buß- und Bettag', () => {
  const dates = ['1995-11-22', '2000-11-22', '2005-11-16', '2018-11-21', '2019-11-20', '2020-11-18', '2021-11-17', '2022-11-16', '2023-11-22', '2024-11-20']
  for (const bnb of dates) {
    expect(moment(bnb).isHoliday('SN')).toBe('Buß- und Bettag');
  }
});

test('Ostermontag', () => {
  const dates = ['1995-04-17', '2000-04-24', '2005-03-28', '2018-04-02', '2019-04-22', '2020-04-13', '2021-04-05', '2022-04-18', '2023-04-10', '2024-04-01']
  for (const d of dates) {
    expect(moment(d).isHoliday()).toBe('Ostermontag');
  }
});

test('DateTimes', () => {
  expect(moment('2019-12-26 00:00:00').isHoliday()).toBe('2. Weihnachtsfeiertag');
  expect(moment('2019-12-26 12:00:00').isHoliday()).toBe('2. Weihnachtsfeiertag');
  expect(moment('2019-12-26 23:59:59').isHoliday()).toBe('2. Weihnachtsfeiertag');

  expect(moment('2019-12-26 00:00:00').isHoliday([])).toStrictEqual({
    allStates: true,
    holidayName: '2. Weihnachtsfeiertag',
    holidayStates: allStates,
    testedStates: allStates
  });
  expect(moment('2019-12-26 12:00:00').isHoliday([])).toStrictEqual({
    allStates: true,
    holidayName: '2. Weihnachtsfeiertag',
    holidayStates: allStates,
    testedStates: allStates
  });
  expect(moment('2019-12-26 23:59:59').isHoliday([])).toStrictEqual({
    allStates: true,
    holidayName: '2. Weihnachtsfeiertag',
    holidayStates: allStates,
    testedStates: allStates
  });

  expect(moment('2019-12-27 00:00:00').isHoliday()).toBe(false);
  expect(moment('2019-12-27 12:00:00').isHoliday()).toBe(false);
  expect(moment('2019-12-27 23:59:59').isHoliday()).toBe(false);
});