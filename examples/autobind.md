# `@autobind` decorator

```ts
import {autobind} from '@shopify/javascript-utilities/decorators';

class Foo {
  // ...
  @autobind
  logData() {
    console.log(this.data);
  }
  // ...
}
```
