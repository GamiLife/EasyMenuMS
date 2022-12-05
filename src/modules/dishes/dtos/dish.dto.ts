import { Expose, Type } from '@nestjs/class-transformer';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { CategoryResponseDto } from 'src/modules/categories/categories.dto';
import { CompanyResponseDto } from 'src/modules/companies/company.dto';

/**
 * Request on create dish
 */
export class DishCreateDto {
  @IsNotEmpty({ message: 'Title required' })
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly price: number;
  @IsString()
  readonly imageUrl: string;
  @IsNotEmpty({ message: 'CategoryId required' })
  @IsNumber()
  readonly categoryId: number;
  @IsNotEmpty({ message: 'CompanyId required' })
  @IsNumber()
  readonly companyId: number;
}

/**
 * Request on update dish
 */
export class DishUpdateDto {
  @IsNotEmpty({ message: 'Title required' })
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly price: number;
  @IsString()
  readonly imageUrl: string;
  @IsNotEmpty({ message: 'CategoryId required' })
  @IsNumber()
  readonly categoryId: number;
  @IsNotEmpty({ message: 'CompanyId required' })
  @IsNumber()
  readonly companyId: number;
}

/**
 * Request on create dishDish
 */
export class DishResponseDto {
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
  @IsNumber()
  readonly price: number;
  @Expose()
  @IsString()
  readonly imageUrl: string;
  @Expose()
  @Type(() => CategoryResponseDto)
  readonly category: CategoryResponseDto;
  @Expose()
  @Type(() => CompanyResponseDto)
  readonly company: CompanyResponseDto;
}
