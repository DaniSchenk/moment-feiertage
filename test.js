const assert = require('assert');
const moment = require('moment');
const {
  isHoliday
} = require('./moment-feiertage');

const allStates = ['BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'];
// test some non-holiday dates
it('should return false', () => {
  assert.equal(false, moment('2017-01-03').isHoliday());
  assert.deepEqual({
    allStates: false,
    holidayName: '',
    holidayStates: [],
    testedStates: allStates
  }, moment('2017-01-03').isHoliday([]));
  
  for(const s of allStates) {
    assert.equal(false, moment('2017-01-03').isHoliday(s));
    assert.deepEqual({
      allStates: false,
      holidayName: '',
      holidayStates: [],
      testedStates: [s]
    }, moment('2017-01-03').isHoliday([s]));
  }
});
// test Christmas
it('should return Christmas', () => {
  assert.equal('1. Weihnachtsfeiertag', moment('2019-12-25').isHoliday());
  assert.deepEqual({
    allStates: true,
    holidayName: '1. Weihnachtsfeiertag',
    holidayStates: allStates,
    testedStates: allStates
  }, moment('2019-12-25').isHoliday([]));

  for(const s of allStates) {
    assert.equal('1. Weihnachtsfeiertag', moment('2019-12-25').isHoliday(s));
    assert.deepEqual({
      allStates: true,
      holidayName: '1. Weihnachtsfeiertag',
      holidayStates: [s],
      testedStates: [s]
    }, moment('2019-12-25').isHoliday([s]));
  }
});

// test Christmas
it('should return correct Object', () => {
  assert.deepEqual({
    allStates: false,
    holidayName: 'Allerheiligen',
    holidayStates: [ 'BW', 'BY', 'NW', 'RP', 'SL' ],
    testedStates: allStates
  }, moment('2018-11-01').isHoliday([]));

  assert.deepEqual({
    allStates: false,
    holidayName: 'Allerheiligen',
    holidayStates: [ 'BW' ],
    testedStates: ['BW', 'SH', 'TH']
  }, moment('2018-11-01').isHoliday(['BW', 'SH', 'TH']));
});
