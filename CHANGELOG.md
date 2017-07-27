# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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


[Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.1.6...v2.0.0