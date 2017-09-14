import {DecoratorFactory, GenericDecorator, DecoratorConfig} from 'lodash-decorators';
import {Applicator, ApplicateOptions} from 'lodash-decorators/applicators';

/**
 * A simplified version of a method decorator
 */
export interface SimpleMethodDecorator {
  (method: Function, thisArg: object, ...decoratorArgs: any[]): any,
}

class GenericApplicator extends Applicator {
  // tslint:disable-next-line prefer-function-over-method
  apply({value, config: {execute}, args, instance}: ApplicateOptions): any {
    if (!instance) {
      return value;
    }

    return execute(value, instance, ...args);
  }
}

/**
 * A factory for creating decorators
 */
export function createMethodDecorator(simpleDecorator: SimpleMethodDecorator): GenericDecorator {
  return DecoratorFactory.createInstanceDecorator(new DecoratorConfig(simpleDecorator, new GenericApplicator()));
}

