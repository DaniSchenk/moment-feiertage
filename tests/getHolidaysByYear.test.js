const moment = require('../build/index');

test('getHolidaysByYear 2020', () => {
  const hU = moment.getHolidaysByYear(2020);
  const hO = {}
  for (const k in hU) {
    hU[k].date = hU[k].date.toISOString();
  }
  Object.keys(hU).sort().forEach((i) => {
    hO[i] = hU[i];
  });

  const cU = {
    Neujahrstag: {
      date: moment('2020-01-01').toISOString(),
      state: []
    },
    'Heilige Drei Könige': {
      date: moment('2020-01-06').toISOString(),
      state: ['BW', 'BY', 'ST']
    },
    Karfreitag: {
      date: moment('2020-04-10').toISOString(),
      state: []
    },
    Ostersonntag: {
      date: moment('2020-04-12').toISOString(),
      state: ['BB']
    },
    Ostermontag: {
      date: moment('2020-04-13').toISOString(),
      state: []
    },
    Maifeiertag: {
      date: moment('2020-05-01').toISOString(),
      state: []
    },
    'Christi Himmelfahrt': {
      date: moment('2020-05-21').toISOString(),
      state: []
    },
    Pfingstsonntag: {
      date: moment('2020-05-31').toISOString(),
      state: ['BB']
    },
    Pfingstmontag: {
      date: moment('2020-06-01').toISOString(),
      state: []
    },
    Fronleichnam: {
      date: moment('2020-06-11').toISOString(),
      state: ['BW', 'BY', 'HE', 'NW', 'RP', 'SL']
    },
    'Mariä Himmelfahrt': {
      date: moment('2020-08-15').toISOString(),
      state: ['SL']
    },
    'Tag der deutschen Einheit': {
      date: moment('2020-10-03').toISOString(),
      state: []
    },
    Reformationstag: {
      date: moment('2020-10-31').toISOString(),
      state: [
        'BB', 'HB', 'HH',
        'MV', 'NI', 'SN',
        'ST', 'SH', 'TH'
      ]
    },
    Allerheiligen: {
      date: moment('2020-11-01').toISOString(),
      state: ['BW', 'BY', 'NW', 'RP', 'SL']
    },
    'Buß- und Bettag': {
      date: moment('2020-11-18').toISOString(),
      state: ['SN']
    },
    '1. Weihnachtsfeiertag': {
      date: moment('2020-12-25').toISOString(),
      state: []
    },
    '2. Weihnachtsfeiertag': {
      date: moment('2020-12-26').toISOString(),
      state: []
    },
    'Internationaler Frauentag': {
      date: moment('2020-03-08').toISOString(),
      state: ['BE']
    },
    Weltkindertag: {
      date: moment('2020-09-20').toISOString(),
      state: ['TH']
    },
    'Tag der Befreiung': {
      date: moment('2020-05-08').toISOString(),
      state: ['BE']
    }
  };
  const cO = {}
  Object.keys(cU).sort().forEach((j) => {
    cO[j] = cU[j];
  });

  expect(hO).toStrictEqual(cO);
});