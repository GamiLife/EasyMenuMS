import { Expose, Type } from '@nestjs/class-transformer';
import {
  IsString,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsNumberString,
} from 'class-validator';
import { PaginationPayload } from 'src/core/dtos';
import { CompanyResponseDto } from '../companies/company.dto';

export class CategoryFilters {}

/**
 * Get By Pagination Request
 */
export class GetCategoriesByCompany extends PaginationPayload<CategoryFilters> {}

/**
 * Request on create category
 */
export class CategoryCreateDto {
  @IsNotEmpty({ message: 'Title required' })
  @MinLength(2, { message: 'Min length of category is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
  readonly title: string;
  @IsString()
  readonly description: string;
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
  @IsNumberString()
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
  @IsString()
  readonly imageCategory: string;
  @Expose()
  @Type(() => CompanyResponseDto)
  readonly company: CompanyResponseDto;
}
