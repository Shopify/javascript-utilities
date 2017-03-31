export default function autobind(target: any, key: string, descriptor: PropertyDescriptor) {
  const functionToBind = descriptor.value;

  // prevents IE11 recursion error
  let definingProperty = false;

  // tslint:disable no-invalid-this
  return {
    configurable: true,
    get() {
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
        return functionToBind;
      }

      const boundFunction = functionToBind.bind(this);
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
}
