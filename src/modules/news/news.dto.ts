import { CompanyResponseDto } from "../companies/company.dto";
import { Expose } from "@nestjs/class-transformer";
import {
  IsString,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsDateString,
  IsNumberString,
} from "class-validator";
import { FnValidator } from "src/core/decorators/custom-validator.decorator";
import { validateRGB } from "src/core/helpers/validators.helper";

/**
 * Request on create new
 */
export class NewCreateDto {
  @IsNotEmpty({ message: "Title required" })
  @MinLength(2, { message: "Min length of is 2 characters" })
  @IsString()
  @MaxLength(150, { message: "This title is not valid" })
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  @FnValidator(validateRGB)
  readonly backgroundColor?: string;
  @IsDateString()
  readonly startDate: Date;
  @IsDateString()
  readonly endDate: Date;
  @IsNotEmpty({ message: "CompanyId required" })
  @IsNumberString()
  readonly companyId: number;
}

/**
 * Request on update new
 */
export class NewUpdateDto {
  @Expose()
  @IsString()
  @MaxLength(150, { message: "This title is not valid" })
  readonly title: string;
  @Expose()
  @IsString()
  readonly description: string;
  @Expose()
  @IsString()
  readonly imageUrl?: string;
  @Expose()
  @IsString()
  @FnValidator(validateRGB)
  readonly backgroundColor?: string;
  @Expose()
  @IsDateString()
  readonly startDate: Date;
  @Expose()
  @IsDateString()
  readonly endDate: Date;
  @Expose()
  @IsNumber()
  readonly companyId: number;
}

/**
 * NewDto
 */
export class NewResponseDto {
  @Expose()
  @IsNumber()
  readonly id: number;
  @Expose()
  @IsString()
  @MaxLength(150, { message: "This title is not valid" })
  readonly title: string;
  @Expose()
  @IsString()
  readonly description: string;
  @Expose()
  @IsString()
  readonly imageUrl?: string;
  @Expose()
  @IsString()
  readonly backgroundColor?: string;
  @Expose()
  @IsDateString()
  readonly startDate: Date;
  @Expose()
  @IsDateString()
  readonly endDate: Date;
  @Expose()
  @IsNumber()
  readonly company: CompanyResponseDto;
}
