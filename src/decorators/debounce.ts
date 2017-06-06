import debounce from 'lodash/debounce';

export interface DebounceSettings {
    leading?: boolean,
    maxWait?: number,
    trailing?: boolean,
}

export default function debounceDecorator(wait = 500, options?: DebounceSettings) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const functionToDebounce = descriptor.value;

    // prevents IE11 recursion error
    let definingProperty = false;

    // tslint:disable no-invalid-this
    return {
      configurable: true,
      get() {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          return functionToDebounce;
        }

        const boundFunction = debounce(functionToDebounce, wait, options);
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
