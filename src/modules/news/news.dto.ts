import { CompanyResponseDto } from '../companies/company.dto';
import { Expose } from '@nestjs/class-transformer';
import {
  IsString,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

/**
 * Request on create new
 */
export class NewCreateDto {
  @IsNotEmpty({ message: 'Title required' })
  @MinLength(2, { message: 'Min length of is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly imageUrl?: string;
  @IsString()
  readonly backgroundColor?: string;
  @IsString()
  readonly startDate: string;
  @IsString()
  readonly endDate: string;
  @IsNotEmpty({ message: 'CompanyId required' })
  @IsNumber()
  readonly companyId: number;
}

/**
 * Request on update new
 */
export class NewUpdateDto {
  @Expose()
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
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
  @IsString()
  readonly startDate: string;
  @Expose()
  @IsString()
  readonly endDate: string;
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
  @MaxLength(150, { message: 'This title is not valid' })
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
  @IsString()
  readonly startDate: string;
  @Expose()
  @IsString()
  readonly endDate: string;
  @Expose()
  @IsNumber()
  readonly company: CompanyResponseDto;
}
