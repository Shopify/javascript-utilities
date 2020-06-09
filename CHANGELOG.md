# Changelog

<!--## [Unreleased]-->

## [2.4.1] - 2019-08-20

### Fixed

- [Dates] `isLessThan*` functions no longer return false positives when passed dates in the future.

## [2.4.0] - 2019-01-04

### Added

- [Dates] New helper functions: `getDateDiff`, `isLessThanOneMinuteAgo`, `isLessThanOneHourAgo`, `isLessThanOneDayAgo`, `isLessThanOneWeekAgo`, and `isLessThanOneYearAgo`.

## [2.3.0] - 2018-11-15

- [Dates] Added new helper functions: `isSameDate`, `isSameMonthAndYear`, `isToday`, and `isYesterday`.

## [2.2.1] - 2018-11-09

- [Dates] Fixed `getNewRange()` when `start` and `end` date are the same but have different references [#42](https://github.com/Shopify/javascript-utilities/pull/42)

## [2.2.0] - 2018-07-18

- [Dates] Added third parameter to `getWeeksForMonth` to specify what day the week starts on.

## [2.1.0] - 2017-10-27

- Updates `focus` functions to match only non-disabled nodes
- Adds `clear` function to `fastdom`. Usage:

```ts
import {write, read, clear} from '@shopify/javscript-utilities/fastdom';

const writeTask = write(...);
const readTask = read(..);

// later
clear(writeTask);
clear(readTask);
```

## [2.0.0] - 2017-07-27

### Added

- Adds a `CHANGELOG` to document changes moving forward.

### Changed

- The `autobind` decorator is now in the `decorators` directory.
  - **WARNING** any existing imports must be changed accordingly:

```ts
// old way
import autobind from '@shopify/javascript-utilities/autobind';

// new way
import {autobind} from '@shopify/javascript-utilities/decorators';
```

- Updated documentation in `README.md` and `CONTRIBUTING.md`.

### Fixed

- Multiple decorators can now be used simultaneously (ex. `autobind` with `debounce`).

---

[unreleased]: https://github.com/shopify/javascript-utilities/compare/v2.4.1...HEAD
[2.4.1]: https://github.com/shopify/javascript-utilities/compare/v2.3.0...v2.4.1
[2.4.0]: https://github.com/shopify/javascript-utilities/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/shopify/javascript-utilities/compare/v2.2.1...v2.3.0
[2.2.1]: https://github.com/shopify/javascript-utilities/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/shopify/javascript-utilities/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/shopify/javascript-utilities/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/shopify/javascript-utilities/compare/v1.1.6...v2.0.0
