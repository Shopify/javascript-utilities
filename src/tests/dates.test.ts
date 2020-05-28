import {
  abbreviationForWeekday,
  getDateDiff,
  getNewRange,
  getWeeksForMonth,
  isLessThanOneMinuteAgo,
  isLessThanOneHourAgo,
  isLessThanOneDayAgo,
  isLessThanOneWeekAgo,
  isLessThanOneYearAgo,
  isSameDate,
  isSameMonthAndYear,
  isToday,
  isYesterday,
  isTomorrow,
  isLeapYear,
  TimeUnit,
  Weekdays,
} from '../dates';

describe('abbreviationForWeekday()', () => {
  it('abbreviates the word correctly', () => {
    expect(abbreviationForWeekday(Weekdays.Sunday)).toBe('Su');
    expect(abbreviationForWeekday(Weekdays.Monday)).toBe('Mo');
    expect(abbreviationForWeekday(Weekdays.Tuesday)).toBe('Tu');
    expect(abbreviationForWeekday(Weekdays.Wednesday)).toBe('We');
    expect(abbreviationForWeekday(Weekdays.Thursday)).toBe('Th');
    expect(abbreviationForWeekday(Weekdays.Friday)).toBe('Fr');
    expect(abbreviationForWeekday(Weekdays.Saturday)).toBe('Sa');
  });
});

describe('getDateDiff()', () => {
  const now = new Date();
  const testDate = new Date(now.getTime());
  testDate.setFullYear(now.getFullYear() - 1);
  const timeUnitYear = isLeapYear(now.getFullYear())
  ? TimeUnit.Day * 366
  : TimeUnit.Year;

  it('returns expected diff in seconds', () => {
    const diff = getDateDiff(TimeUnit.Second, testDate, now);
    expect(diff).toEqual(timeUnitYear / TimeUnit.Second);
  });

  it('returns expected diff in minutes', () => {
    const diff = getDateDiff(TimeUnit.Minute, testDate, now);
    expect(diff).toEqual(timeUnitYear / TimeUnit.Minute);
  });

  it('returns expected diff in hours', () => {
    const diff = getDateDiff(TimeUnit.Hour, testDate, now);
    expect(diff).toEqual(timeUnitYear / TimeUnit.Hour);
  });

  it('returns expected diff in days', () => {
    const diff = getDateDiff(TimeUnit.Day, testDate, now);
    expect(diff).toEqual(timeUnitYear / TimeUnit.Day);
  });

  it('returns expected diff in weeks', () => {
    const diff = getDateDiff(TimeUnit.Week, testDate, now);
    expect(diff).toEqual(Math.floor(timeUnitYear / TimeUnit.Week));
  });

  it('returns expected diff in years', () => {
    const diff = getDateDiff(timeUnitYear, testDate, now);
    expect(diff).toEqual(timeUnitYear / timeUnitYear);
  });

  describe('second date defaults to today', () => {
    it('returns expected diff in seconds', () => {
      const diff = getDateDiff(TimeUnit.Second, testDate);
      expect(diff).toEqual(timeUnitYear / TimeUnit.Second);
    });

    it('returns expected diff in minutes', () => {
      const diff = getDateDiff(TimeUnit.Minute, testDate);
      expect(diff).toEqual(timeUnitYear / TimeUnit.Minute);
    });

    it('returns expected diff in hours', () => {
      const diff = getDateDiff(TimeUnit.Hour, testDate);
      expect(diff).toEqual(timeUnitYear / TimeUnit.Hour);
    });

    it('returns expected diff in days', () => {
      const diff = getDateDiff(TimeUnit.Day, testDate);
      expect(diff).toEqual(timeUnitYear / TimeUnit.Day);
    });

    it('returns expected diff in weeks', () => {
      const diff = getDateDiff(TimeUnit.Week, testDate);
      expect(diff).toEqual(Math.floor(timeUnitYear / TimeUnit.Week));
    });

    it('returns expected diff in years', () => {
      const diff = getDateDiff(timeUnitYear, testDate);
      expect(diff).toEqual(timeUnitYear / timeUnitYear);
    });
  });
});

describe('getWeeksForMonth()', () => {
  it('starts the week on Sunday by default', () => {
    const weeks = getWeeksForMonth(1, 2018);
    weeks.map((week) => {
      const startDay = week[0];
      if (startDay !== null) {
        expect(startDay.getDay()).toBe(Weekdays.Sunday);
      }
    });
  });

  it('always has 7 value for each weeks', () => {
    const weeks = getWeeksForMonth(6, 2018);
    weeks.map((week) => {
      expect(week).toHaveLength(7);
    });
  });

  it('first day of the week is the one passed as argument', () => {
    [
      Weekdays.Sunday,
      Weekdays.Monday,
      Weekdays.Tuesday,
      Weekdays.Wednesday,
      Weekdays.Thursday,
      Weekdays.Friday,
      Weekdays.Saturday,
    ].map((weekDay) => {
      const weeks = getWeeksForMonth(8, 2018, weekDay);
      weeks.map((week) => {
        const startDay = week[0];
        if (startDay !== null) {
          expect(startDay.getDay()).toBe(weekDay);
        } else {
          expect(startDay).toBeNull();
        }
      });
    });
  });

  it('sets values to null before first day of month', () => {
    const weeks = getWeeksForMonth(6, 2018, Weekdays.Monday);
    expect(weeks[0][0]).toBeNull();
    expect(weeks[0][1]).toBeNull();
    expect(weeks[0][2]).toBeNull();
    expect(weeks[0][3]).toBeNull();
    expect(weeks[0][4]).toBeNull();
    expect(weeks[0][5]).toBeNull();
    expect(weeks[0][6]).not.toBeNull();
  });
});

describe('getNewRange()', () => {
  it('returns a new range with end date in the future', () => {
    // startDate and endDate are the same date but have different references for
    // test purposes
    const startDate = new Date('01 Jan 2018 00:00:00 GMT');
    const endDate = new Date('01 Jan 2018 00:00:00 GMT');
    const futureDate = new Date('05 Jan 2018 00:00:00 GMT');

    const range = {
      start: startDate,
      end: endDate,
    };

    expect(getNewRange(range, futureDate)).toEqual({
      start: startDate,
      end: futureDate,
    });
  });
});

describe('isLessThanOneMinuteAgo', () => {
  it('returns false for dates in the future', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setFullYear(now.getFullYear() + 1);
    expect(isLessThanOneMinuteAgo(other, now)).toBe(false);
  });

  it('returns false for dates more than one minute apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setSeconds(now.getSeconds() - 61);
    expect(isLessThanOneMinuteAgo(other, now)).toBe(false);
  });

  it('returns false for dates exactly one minute apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setSeconds(now.getSeconds() - 60);
    expect(isLessThanOneMinuteAgo(other, now)).toBe(false);
  });

  it('returns true for dates less than one minute apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setSeconds(now.getSeconds() - 59);
    expect(isLessThanOneMinuteAgo(other, now)).toBe(true);
  });
});

describe('isLessThanOneHourAgo', () => {
  it('returns false for dates in the future', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setFullYear(now.getFullYear() + 1);
    expect(isLessThanOneHourAgo(other, now)).toBe(false);
  });

  it('returns false for dates more than one hour apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setMinutes(now.getMinutes() - 61);
    expect(isLessThanOneHourAgo(other, now)).toBe(false);
  });

  it('returns false for dates exactly one hour apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setMinutes(now.getMinutes() - 60);
    expect(isLessThanOneHourAgo(other, now)).toBe(false);
  });

  it('returns true for dates less than one hour apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setMinutes(now.getMinutes() - 59);
    expect(isLessThanOneHourAgo(other, now)).toBe(true);
  });
});

describe('isLessThanOneDayAgo', () => {
  it('returns false for dates in the future', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setFullYear(now.getFullYear() + 1);
    expect(isLessThanOneDayAgo(other, now)).toBe(false);
  });

  it('returns false for dates more than one day apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setHours(now.getHours() - 25);
    expect(isLessThanOneDayAgo(other, now)).toBe(false);
  });

  it('returns false for dates exactly one day apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setHours(now.getHours() - 24);
    expect(isLessThanOneDayAgo(other, now)).toBe(false);
  });

  it('returns true for dates less than one day apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setHours(now.getHours() - 23);
    expect(isLessThanOneDayAgo(other, now)).toBe(true);
  });
});

describe('isLessThanOneWeekAgo', () => {
  it('returns false for dates in the future', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setFullYear(now.getFullYear() + 1);
    expect(isLessThanOneWeekAgo(other, now)).toBe(false);
  });

  it('returns false for dates more than one week apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setDate(now.getDate() - 8);
    expect(isLessThanOneWeekAgo(other, now)).toBe(false);
  });

  it('returns false for dates exactly one week apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setDate(now.getDate() - 7);
    expect(isLessThanOneWeekAgo(other, now)).toBe(false);
  });

  it('returns true for dates less than one week apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setDate(now.getDate() - 6);
    expect(isLessThanOneWeekAgo(other, now)).toBe(true);
  });
});

describe('isLessThanOneYearAgo', () => {
  it('returns false for dates in the future', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setFullYear(now.getFullYear() + 1);
    expect(isLessThanOneYearAgo(other, now)).toBe(false);
  });

  it('returns false for dates more than one year apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setDate(now.getDate() - 366);
    expect(isLessThanOneYearAgo(other, now)).toBe(false);
  });

  it('returns false for dates exactly one year apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setDate(now.getDate() - 365);
    expect(isLessThanOneYearAgo(other, now)).toBe(false);
  });

  it('returns true for dates less than one year apart', () => {
    const now = new Date();
    const other = new Date(now.getTime());
    other.setDate(now.getDate() - 364);
    expect(isLessThanOneYearAgo(other, now)).toBe(true);
  });
});

describe('isSameMonthAndYear', () => {
  it('returns true for dates with same month and year', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    expect(isSameMonthAndYear(date1, date2)).toBe(true);

    date2.setDate(2);
    expect(isSameMonthAndYear(date1, date2)).toBe(true);
  });

  it('returns false for dates with same month and different year', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    date2.setFullYear(date1.getFullYear() + 1);
    expect(isSameMonthAndYear(date1, date2)).toBe(false);
  });

  it('returns false for dates with different month and same year', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    date2.setMonth(date1.getMonth() + 1);
    expect(isSameMonthAndYear(date1, date2)).toBe(false);
  });
});

describe('isSameDate', () => {
  it('returns true for dates with same day, month, and year', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    expect(isSameDate(date1, date2)).toBe(true);

    date2.setHours(2);
    expect(isSameDate(date1, date2)).toBe(true);
  });

  it('returns false for dates with same day and month, but different year', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    date2.setFullYear(date1.getFullYear() + 1);
    expect(isSameDate(date1, date2)).toBe(false);
  });

  it('returns false for dates with same day and year, but different month', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    date2.setMonth(date1.getMonth() + 1);
    expect(isSameDate(date1, date2)).toBe(false);
  });

  it('returns false for dates with same month and year, but different day', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    date2.setDate(date1.getDate() + 1);
    expect(isSameDate(date1, date2)).toBe(false);
  });
});

describe('isToday', () => {
  it('returns true for dates with same day, month, and year as today', () => {
    const today = new Date();
    expect(isToday(today)).toBe(true);

    // Time is irrelevant
    const differentMinutes = new Date(today.getTime());
    differentMinutes.setMinutes(today.getMinutes() + 1);
    expect(isToday(differentMinutes)).toBe(true);

    const differentHours = new Date(today.getTime());
    differentHours.setHours(today.getHours() + 1);
    expect(isToday(differentHours)).toBe(true);
  });

  it('returns false for dates with different day, month, or year from today', () => {
    const today = new Date();

    const differentDay = new Date(today.getTime());
    differentDay.setDate(today.getDate() + 1);
    expect(isToday(differentDay)).toBe(false);

    const differentMonth = new Date(today.getTime());
    differentMonth.setMonth(today.getMonth() + 1);
    expect(isToday(differentMonth)).toBe(false);

    const differentYear = new Date(today.getTime());
    differentYear.setFullYear(today.getFullYear() + 1);
    expect(isToday(differentYear)).toBe(false);
  });
});

describe('isYesterday', () => {
  it('returns true for dates with same day, month, and year as the day before today', () => {
    const today = new Date();
    const yesterday = new Date(today.getTime());
    yesterday.setDate(today.getDate() - 1);
    expect(isYesterday(yesterday)).toBe(true);

    // Time is irrelevant
    const differentMinutes = new Date(yesterday.getTime());
    differentMinutes.setMinutes(yesterday.getMinutes() + 1);
    expect(isYesterday(differentMinutes)).toBe(true);

    const differentHours = new Date(yesterday.getTime());
    differentHours.setHours(yesterday.getHours() + 1);
    expect(isYesterday(differentHours)).toBe(true);
  });

  it('returns false for dates with different day, month, or year from today', () => {
    const today = new Date();
    const yesterday = new Date(today.getTime());
    yesterday.setDate(today.getDate() - 1);

    const differentDay = new Date(yesterday.getTime());
    differentDay.setDate(yesterday.getDate() + 1);
    expect(isYesterday(differentDay)).toBe(false);

    const differentMonth = new Date(yesterday.getTime());
    differentMonth.setMonth(yesterday.getMonth() + 1);
    expect(isYesterday(differentMonth)).toBe(false);

    const differentYear = new Date(yesterday.getTime());
    differentYear.setFullYear(yesterday.getFullYear() + 1);
    expect(isYesterday(differentYear)).toBe(false);
  });
});

describe('isTomorrow', () => {
  it('returns true for dates with same day, month, and year as the day after today', () => {
    const today = new Date();
    const tomorrow = new Date(today.getTime());
    tomorrow.setDate(today.getDate() + 1);
    expect(isTomorrow(tomorrow)).toBe(true);

    // Time is irrelevant
    const differentMinutes = new Date(tomorrow.getTime());
    differentMinutes.setMinutes(tomorrow.getMinutes() + 1);
    expect(isTomorrow(differentMinutes)).toBe(true);

    const differentHours = new Date(tomorrow.getTime());
    differentHours.setHours(tomorrow.getHours() + 1);
    expect(isTomorrow(differentHours)).toBe(true);
  });

  it('returns false for dates with different day, month, or year from today', () => {
    const today = new Date();
    const tomorrow = new Date(today.getTime());
    tomorrow.setDate(today.getDate() + 1);

    const differentDay = new Date(tomorrow.getTime());
    differentDay.setDate(tomorrow.getDate() + 1);
    expect(isTomorrow(differentDay)).toBe(false);

    const differentMonth = new Date(tomorrow.getTime());
    differentMonth.setMonth(tomorrow.getMonth() + 1);
    expect(isTomorrow(differentMonth)).toBe(false);

    const differentYear = new Date(tomorrow.getTime());
    differentYear.setFullYear(tomorrow.getFullYear() + 1);
    expect(isTomorrow(differentYear)).toBe(false);
  });
});

describe('isLeapYear', () => {
  it('returns false for year divisible by 4 and 100 but not divisible by 400', () => {
    const now = new Date();
    now.setFullYear(1900);
    const year = now.getFullYear();
    expect(isLeapYear(year)).toBe(false);
  });

  it('returns false for year not divisible by 4, 100 or 400', () => {
    const now = new Date();
    now.setFullYear(1241);
    const year = now.getFullYear();
    expect(isLeapYear(year)).toBe(false);
  });

  it('returns true for year divisible by 4, but not divisible by 400 and 100', () => {
    const now = new Date();
    now.setFullYear(2020);
    const year = now.getFullYear();
    expect(isLeapYear(year)).toBe(true);
  });

  it('returns true for year divisible by 4, 100 and 400', () => {
    const now = new Date();
    now.setFullYear(2000);
    const year = now.getFullYear();
    expect(isLeapYear(year)).toBe(true);
  });
});
