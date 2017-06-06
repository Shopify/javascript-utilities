import memoize from 'lodash/memoize';

export default function memoizeDecorator(resolver?: Function) {
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

        const boundFunction = memoize(functionToMemoize, resolver);
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
