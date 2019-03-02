(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory(require('moment'));
	} else if (typeof define === 'function' && define.amd) {
		define('moment-feiertage', ['moment'], factory);
	} else {
		root.moment = factory(root.moment);
	}
}(this, function (moment) {
	var hasModule;

	hasModule = (typeof module !== "undefined" && module !== null) && (module.exports != null);

	if (typeof moment === 'undefined') {
		throw Error("Can't find moment");
	}

	moment.fn.isHoliday = function (_states) {
		// call backwords compatible function
		if (typeof _states === 'string' || _states == null) {
			// call backwards compatible function
			return isHoliday106(this, _states);

		}

		// return Object if argument contains an Array
		if (_states instanceof Array) {
			var allStates = ['BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'];
			var testStates = prepareArray(_states);
			var result = {
				allStates: false,
				holidayName: '',
				holidayStates: [],
				testedStates: testStates
			};

			// check in all states if no states passed
			if (testStates.length < 1) {
				testStates = allStates;
			}
			// loop tested states and validate holiday
			for (i = 0; i < testStates.length; i++) {
				var holiday = isHoliday106(this, testStates[i]);
				if (holiday) {
					// add validated states to result object
					result.holidayName = holiday;
					result.holidayStates.push(testStates[i]);
				}
			}
			// set allStates value
			if (isHoliday106(this)) {
				result.allStates = true;
			}
			result.testedStates = testStates;
			return result;
		}
	}

	isHoliday106 = function (momentObj, state) {
		// EXCEPTION: 2017 Reformationstag is holiday in all states
		if (momentObj.isSame(moment('2017-10-31'), 'day')) {
			return 'Reformationstag';
		}

		var year = momentObj.year();
		var easter = moment(calculateEasterDate(year)).format();
		var holidays = {
			'Neujahrstag': {
				'date': moment(year + '-01-01'),
				'state': []
			},
			'Karfreitag': {
				'date': moment(easter).subtract(2, 'days'),
				'state': []
			},
			'Heilige Drei Könige': {
				'date': moment(year + '-01-06'),
				'state': ['BW', 'BY', 'ST']
			},
			'Ostersonntag': {
				'date': moment(easter),
				'state': ['BB']
			},
			'Ostermontag': {
				'date': moment(easter).add(1, 'days'),
				'state': []
			},
			'Maifeiertag': {
				'date': moment(year + '-05-01'),
				'state': []
			},
			'Christi Himmelfahrt': {
				'date': moment(easter).add(39, 'days'),
				'state': []
			},
			'Pfingstsonntag': {
				'date': moment(easter).add(49, 'days'),
				'state': ['BB']
			},
			'Pfingstmontag': {
				'date': moment(easter).add(50, 'days'),
				'state': []
			},
			'Fronleichnam': {
				'date': moment(easter).add(60, 'days'),
				'state': ['BW', 'BY', 'HE', 'NW', 'RP', 'SL']
			},
			'Mariä Himmelfahrt': {
				'date': moment(year + '-08-15'),
				'state': ['SL']
			},
			'Tag der deutschen Einheit': {
				'date': moment(year + '-10-03'),
				'state': []
			},
			'Reformationstag': {
				'date': moment(year + '-10-31'),
				'state': ['BB', 'MV', 'SN', 'ST', 'TH']
			},
			'Allerheiligen': {
				'date': moment(year + '-11-01'),
				'state': ['BW', 'BY', 'NW', 'RP', 'SL']
			},
			'Buß- und Bettag': {
				'date': calculateBandBDate(year),
				'state': ['SN']
			},
			'1. Weihnachtsfeiertag': {
				'date': moment(year + '-12-25'),
				'state': []
			},
			'2. Weihnachtsfeiertag': {
				'date': moment(year + '-12-26'),
				'state': []
			}
		}

		if (year > 2017) {
			// since 2018 HB, HH, NI, SH celebrate 'Reformationstag' as well
			holidays['Reformationstag']['state'] = ['BB', 'HB', 'HH', 'MV', 'NI', 'SN', 'ST', 'SH', 'TH'];
		}

		if (year > 2018) {
			holidays['Internationaler Frauentag'] = {
				'date':  moment(year + '-03-08'),
				'state': ['BE'],
			};
		}

		// one time only holiday in Berlin
		if (year == 2020) {
			holidays['75. Jahrestag der Befreiung vom Nationalsozialismus und der Beendigung des zweiten Weltkrieges in Europa'] = {
				'date':  moment(year + '-05-08'),
				'state': ['BE'],
			};
		}

		for (var holiday in holidays) {
			if (momentObj.isSame(holidays[holiday].date, 'day')) {
				var states = holidays[holiday].state
				if (states.length === 0) { // if state empty -> holiday for every state
					return holiday;
				} else {
					// check if it is a holiday in state (param)
					if (state != null && state !== "" && state.length === 2 && states.indexOf(state) > -1) {
						return holiday;
					} else {
						return false;
					}
				}
			}
		}
		return false;
	}

	calculateEasterDate = function (Y) {
		var C = Math.floor(Y / 100);
		var N = Y - 19 * Math.floor(Y / 19);
		var K = Math.floor((C - 17) / 25);
		var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
		I = I - 30 * Math.floor((I / 30));
		I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
		var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
		J = J - 7 * Math.floor(J / 7);
		var L = I - J;
		var M = 3 + Math.floor((L + 40) / 44);
		var D = L + 28 - 31 * Math.floor(M / 4);

		return Y + '-' + padout(M) + '-' + padout(D);
	}
	padout = function (number) {
		return (number < 10) ? '0' + number : number;
	}
	calculateBandBDate = function (Y) {
		moment(Y + '-11-23') //must be before 23. nov
		for (var i = 1; i < 8; i++) {
			var day = moment(Y + '-11-23').subtract(i, 'days');
			if (day.isoWeekday() === 3) {
				return day;
			}
		}
	}
	prepareArray = function (array) {
		// sort out false values
		var preparedArray = [];
		for (i = 0; i < array.length; i++) {
			if (array[i] != null && array[i] !== '' && array[i].length === 2) {
				preparedArray.push(array[i]);
			}
		}
		// sort array
		preparedArray.sort();

		// remove duplicates
		var uniqueArray = preparedArray.filter(function (item, pos) {
			return preparedArray.indexOf(item) == pos;
		});
		return uniqueArray;
	}
	return moment;
}));
