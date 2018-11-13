import {
  abbreviationForWeekday,
  getNewRange,
  getWeeksForMonth,
  isSameDate,
  isSameMonthAndYear,
  isToday,
  isYesterday,
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
