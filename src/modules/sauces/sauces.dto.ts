import { Expose, Type } from '@nestjs/class-transformer';
import {
  IsString,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { PaginationPayload } from 'src/core/dtos';
import { CompanyResponseDto } from '../companies/company.dto';

export class SauceFilters {}
/**
 * Get By Pagination Request
 */
export class GetSaucesByCompany extends PaginationPayload<SauceFilters> {}

/**
 * Request on create sauce
 */
export class SauceCreateDto {
  @IsNotEmpty({ message: 'Title required' })
  @MinLength(2, { message: 'Min length of category is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly price: number;
  @IsString()
  readonly imageUrl: string;
  @IsNotEmpty({ message: 'CompanyId required' })
  @IsNumber()
  readonly companyId: number;
}

/**
 * Request on update sauce
 */
export class SauceUpdateDto {
  @Expose()
  @Type(() => CompanyResponseDto)
  @IsNotEmpty({ message: 'Title required' })
  @MinLength(2, { message: 'Min length of category is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
  readonly title: string;
  @Expose()
  @IsString()
  readonly description: string;
  @Expose()
  @IsNumber()
  readonly price: number;
  @Expose()
  @IsString()
  readonly imageUrl: string;
  @Expose()
  @IsNotEmpty({ message: 'CompanyId required' })
  @IsNumber()
  readonly companyId: number;
}

/**
 * SauceDto
 */
export class SauceResponseDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsString()
  readonly title: string;
  @Expose()
  @IsString()
  readonly description: string;
  @Expose()
  @IsString()
  readonly price: number;
  @Expose()
  @IsString()
  readonly imageUrl: string;
  @Expose()
  @Type(() => CompanyResponseDto)
  readonly company: CompanyResponseDto;
}
