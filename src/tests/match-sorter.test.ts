import matchSorter, {rankings} from '../match-sorter';

describe('matchSorter', () => {
  it('returns an empty array when the query is too long', () => {
    const items = ['Australia', 'Austria', 'Georgia', 'Germany'];
    const query = 'SomeReallyLongString';

    const expected: string[] = [];
    const actual = matchSorter(items, query);

    expect(expected).toEqual(actual);
  });

  it('returns an empty array when the query matches no items', () => {
    ['nomatch', 'z', '123'].forEach((query) => {
      const items = ['Australia', 'Austria', 'Georgia', 'Germany'];

      const expected: string[] = [];
      const actual = matchSorter(items, query);

      expect(expected).toEqual(actual);
    });
  });

  it('returns the items that match', () => {
    const items = ['Australia', 'Austria', 'Georgia', 'Germany'];
    const query = 'ger';

    const expected = ['Germany'];
    const actual = matchSorter(items, query);

    expect(expected).toEqual(actual);
  });

  it('sorts equally ranking items in the same order in which they appeared in the original array', () => {
    const items = ['Foo1', 'Bar', 'Foo2'];
    const query = 'foo';

    const expected = ['Foo1', 'Foo2'];
    const actual = matchSorter(items, query);

    expect(expected).toEqual(actual);
  });

  it('returns matched items in the order of best match', () => {
    const items = [
      // STARTS_WITH
      'There',
      // CONTAINS
      'Ethernet',
      // NO MATCH,
      'no match',
      // WORD_STARTS_WITH
      'Once upon a time, there was',
      // EQUAL
      'The',
      'thE',
      // CASE_SENSITIVE_EQUAL
      'the',
    ];
    const query = 'the';

    const expected = [
      // CASE_SENSITIVE_EQUAL
      'the',
      // EQUAL
      'The',
      'thE',
      // STARTS_WITH
      'There',
      // WORD_STARTS_WITH
      'Once upon a time, there was',
      // CONTAINS
      'Ethernet',
    ];
    const actual = matchSorter(items, query);

    expect(expected).toEqual(actual);
  });

  it('matches strings containing diacritics', () => {
    const items = ['français', 'çà', 'Ca', 'Desćârtes'];
    const query = 'ca';

    const expected = ['çà', 'Ca', 'français', 'Desćârtes'];
    const actual = matchSorter(items, query, {
      threshold: rankings.NO_MATCH,
    });

    expect(expected).toEqual(actual);
  });

  it('returns all of the items when providing a rank threshold of NO_MATCH', () => {
    const items = ['orange', 'apple', 'grape', 'banana'];
    const query = 'ap';

    const expected = ['apple', 'grape', 'orange', 'banana'];
    const actual = matchSorter(items, query, {
      threshold: rankings.NO_MATCH,
    });

    expect(expected).toEqual(actual);
  });

  it('returns only items that are an exact match when providing a rank threshold of EQUAL', () => {
    const items = ['apple', 'app', 'apply'];
    const query = 'app';

    const expected = ['app'];
    const actual = matchSorter(items, query, {
      threshold: rankings.EQUAL,
    });

    expect(expected).toEqual(actual);
  });

  it('returns only items with words staring with the query when providing a rank threshold of WORD_STARTS_WITH', () => {
    const items = ['fiji apple', 'app', 'crabapple', 'apple', 'apply', 'something'];
    const query = 'app';

    const expected = ['app', 'apple', 'apply', 'fiji apple'];
    const actual = matchSorter(items, query, {
      threshold: rankings.WORD_STARTS_WITH,
    });

    expect(expected).toEqual(actual);
  });
});
