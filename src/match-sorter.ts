import {remove as removeDiacritics} from 'diacritics';

interface Item {
  item: string,
  rank: number,
  index: number,
  keyIndex: number,
}

interface Options {
  threshold?: number,
  ranking?(testString: string, stringToRank: string): number,
}

interface Ranking {
  rank: number,
  index: number,
  keyIndex: number,
}

export const rankings = {
  CASE_SENSITIVE_EQUAL: 5,
  EQUAL: 4,
  STARTS_WITH: 3,
  WORD_STARTS_WITH: 2,
  CONTAINS: 1,
  NO_MATCH: 0,
};


/**
 * Gives a rankings score based on how well the two strings match.
 * @param {String} testString - the string to test against
 * @param {String} stringToRank - the string to rank
 * @returns {Number} the ranking for how well stringToRank matches testString
 */
function defaultRanking(testString: string, stringToRank: string): number {
  testString = removeDiacritics(testString);
  stringToRank = removeDiacritics(stringToRank);

  // too long
  if (stringToRank.length > testString.length) {
    return rankings.NO_MATCH;
  }

  if (testString === stringToRank) {
    return rankings.CASE_SENSITIVE_EQUAL;
  }

  testString = testString.toLowerCase();
  stringToRank = stringToRank.toLowerCase();

  if (testString === stringToRank) {
    return rankings.EQUAL;
  }

  if (testString.indexOf(stringToRank) === 0) {
    return rankings.STARTS_WITH;
  }

  if (testString.indexOf(` ${stringToRank}`) !== -1) {
    return rankings.WORD_STARTS_WITH;
  }

  if (testString.indexOf(stringToRank) !== -1) {
    return rankings.CONTAINS;
  }

  return rankings.NO_MATCH;
}

/**
 * Sorts items that have a rank, index, and keyIndex
 * @param {Object} a - the first item to sort
 * @param {Object} b - the second item to sort
 * @return {Number} -1 if a should come first, 1 if b should come first
 * Note: will never return 0
 */
function sortRankedItems(a: Ranking, b: Ranking) {
  const aFirst = -1;
  const bFirst = 1;

  if (a.rank === b.rank) {
    if (a.keyIndex === b.keyIndex) {
      return a.index < b.index ? aFirst : bFirst;
    } else {
      return a.keyIndex < b.keyIndex ? aFirst : bFirst;
    }
  } else {
    return a.rank > b.rank ? aFirst : bFirst;
  }
}

/**
 * Takes an array of items and a value and returns a new array with the items that match the given value
 * @param {Array} items - the items to sort
 * @param {String} value - the value to use for ranking
 * @param {Object} options
 * @return {Array} - the new sorted array
 */
export default function matchSorter(items: string[], value: string, options?: Options) {
  const {threshold = rankings.CONTAINS, ranking = defaultRanking} = {...options};
  const matchedItems = items.reduce(reduceItemsToRanked, []);

  function reduceItemsToRanked(matches: Item[], item: string, index: number): Item[] {
    const rank: number = ranking(item, value);

    if (rank >= threshold) {
      matches.push({item, rank, index, keyIndex: -1});
    }
    return matches;
  }

  return matchedItems
    .sort(sortRankedItems)
    .map(({item}: Item) => item);
}
