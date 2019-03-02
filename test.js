const assert = require('assert');
const moment = require('moment');
const {
  isHoliday
} = require('./moment-feiertage');

const allStates = ['BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'];

it('test non holiday dates', () => {
  // 1.0.0
  assert.equal(false, moment('2017-01-03').isHoliday());
  // 1.1.0
  assert.deepEqual({
    allStates: false,
    holidayName: '',
    holidayStates: [],
    testedStates: allStates
  }, moment('2017-01-03').isHoliday([]));
  
  // test each single state
  for(const s of allStates) {
    // 1.0.0
    assert.equal(false, moment('2017-01-03').isHoliday(s));
    // 1.1.0
    assert.deepEqual({
      allStates: false,
      holidayName: '',
      holidayStates: [],
      testedStates: [s]
    }, moment('2017-01-03').isHoliday([s]));
  }
});

it('test 1. Weihnachtsfeiertag', () => {
  // 1.0.0
  assert.equal('1. Weihnachtsfeiertag', moment('2019-12-25').isHoliday());
  // 1.1.0
  assert.deepEqual({
    allStates: true,
    holidayName: '1. Weihnachtsfeiertag',
    holidayStates: allStates,
    testedStates: allStates
  }, moment('2019-12-25').isHoliday([]));

  for(const s of allStates) {
    // 1.0.0
    assert.equal('1. Weihnachtsfeiertag', moment('2019-12-25').isHoliday(s));
    // 1.1.0
    assert.deepEqual({
      allStates: true,
      holidayName: '1. Weihnachtsfeiertag',
      holidayStates: [s],
      testedStates: [s]
    }, moment('2019-12-25').isHoliday([s]));
  }
});

it('test Reformationstag', () => {
  // before 2017
  const before2017 = ['BB', 'MV', 'SN', 'ST', 'TH'];
  for(const s of allStates) {
    let actual = false;
    if(before2017.includes(s)) {
      actual = 'Reformationstag';
    }
    // 1.0.0
    assert.equal(actual, moment('2016-10-31').isHoliday(s));
  }
  // 1.1.0
  assert.deepEqual({
    allStates: false,
    holidayName: 'Reformationstag',
    holidayStates: before2017,
    testedStates: allStates
  }, moment('2016-10-31').isHoliday([]));
  
  // 2017
  assert.deepEqual({
    allStates: true,
    holidayName: 'Reformationstag',
    holidayStates: allStates,
    testedStates: allStates
  }, moment('2017-10-31').isHoliday([]));
  
  // after 2017
  const after2017 = ['BB', 'HB', 'HH', 'MV', 'NI', 'SN', 'ST', 'SH', 'TH'];
  for(const s of allStates) {
    let actual = false;
    if(after2017.includes(s)) {
      actual = 'Reformationstag';
    }
    // 1.0.0
    assert.equal(actual, moment('2018-10-31').isHoliday(s));
  }
  // 1.1.0
  assert.deepEqual({
    allStates: false,
    holidayName: 'Reformationstag',
    holidayStates: after2017,
    testedStates: allStates
  }, moment('2018-10-31').isHoliday([]));
});
