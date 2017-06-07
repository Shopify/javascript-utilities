import lodashMemoize = require('lodash/memoize');

export default function memoize(resolver?: Function) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const functionToMemoize = descriptor.value;

    // prevents IE11 recursion error
    let definingProperty = false;

    // tslint:disable no-invalid-this
    return {
      configurable: true,
      get() {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          return functionToMemoize;
        }

        const boundFunction = lodashMemoize(functionToMemoize, resolver);
        definingProperty = true;

        Object.defineProperty(this, key, {
          value: boundFunction,
          configurable: true,
          writable: true,
        });

        definingProperty = false;
        return boundFunction;
      },
    };
    // tslint:enable
  };
}
