import { Expose } from '@nestjs/class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * Request on create company
 */
export class CompanyCreateDto {
  @IsNotEmpty({ message: 'Name required' })
  @MinLength(2, { message: 'Min length of name is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This name is not valid' })
  readonly name: string;
  @IsString()
  readonly description: string;
}

/**
 * Request on create company
 */
export class CompanyUpdateDto {
  @Expose()
  @IsNotEmpty({ message: 'Name required' })
  @MinLength(2, { message: 'Min length of name is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This name is not valid' })
  readonly name: string;
  @Expose()
  @IsString()
  readonly description: string;
}

/**
 * CompanyDto
 */
export class CompanyResponseDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsString()
  readonly name: string;
  @Expose()
  @IsString()
  readonly description: string;
}
