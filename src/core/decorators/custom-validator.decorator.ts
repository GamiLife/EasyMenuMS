import { registerDecorator, ValidationOptions } from 'class-validator';
import { CustomValidatorField } from '../validations';

export const FnValidator = (fn: (key: string, value: string) => boolean) => {
  return function (
    object: any,
    propertyName: string,
    validationOptions?: ValidationOptions
  ) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [fn, propertyName],
      validator: CustomValidatorField,
    });
  };
};
