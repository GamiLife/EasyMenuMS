import { Expose, Type } from '@nestjs/class-transformer';
import {
  IsString,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { CompanyResponseDto } from '../companies/company.dto';

/**
 * Request on create category
 */
export class CategoryCreateDto {
  @IsNotEmpty({ message: 'Title required' })
  @MinLength(2, { message: 'Min length of is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNotEmpty({ message: 'IconId required' })
  @IsString()
  readonly iconId: string;
  @IsNotEmpty({ message: 'CompanyId required' })
  @IsNumber()
  readonly companyId: number;
}

/**
 * Request on update category
 */
export class CategoryUpdateDto {
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly iconId: string;
  @IsNumber()
  readonly companyId: number;
}

/**
 * CategoryDto
 */
export class CategoryResponseDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
  readonly title: string;
  @Expose()
  @IsString()
  readonly description: string;
  @Expose()
  @IsString()
  readonly iconId: string;
  @Expose()
  @Type(() => CompanyResponseDto)
  readonly company: CompanyResponseDto;
}
