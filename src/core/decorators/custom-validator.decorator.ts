import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "FnValidator", async: true })
@Injectable()
export class CustomValidator implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [fnValidator, propertyName] = args.constraints;

    const isValid = fnValidator?.(propertyName, value);

    return isValid;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} entered is not valid`;
  }
}

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
      validator: CustomValidator,
    });
  };
};
