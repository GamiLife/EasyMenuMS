import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'FnValidator', async: true })
@Injectable()
export class CustomValidatorField implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [fnValidator, propertyName] = args.constraints;

    const isValid = fnValidator?.(propertyName, value);

    return isValid;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} entered is not valid`;
  }
}
