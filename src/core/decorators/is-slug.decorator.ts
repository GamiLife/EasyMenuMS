import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsSlugValidator } from '../validations';

export const IsSlug = () => {
  return function (
    object: any,
    propertyName: string,
    validationOptions?: ValidationOptions
  ) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [propertyName],
      validator: IsSlugValidator,
    });
  };
};
