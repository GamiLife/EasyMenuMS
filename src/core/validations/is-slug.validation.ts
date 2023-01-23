import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isSlug } from '../helpers';

@ValidatorConstraint({ name: 'IsSlugValidator', async: true })
@Injectable()
export class IsSlugValidator implements ValidatorConstraintInterface {
  async validate(value: any, args?: ValidationArguments) {
    const isValid = isSlug(value);

    return isValid;
  }
  defaultMessage?(args?: ValidationArguments): string {
    return `${args.property} entered dont apply slug standard rules`;
  }
}
