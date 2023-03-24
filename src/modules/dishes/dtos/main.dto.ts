import { Expose, Type } from '@nestjs/class-transformer';
import { IsNumber } from 'class-validator';
import { PaginationPayload } from 'src/core/dtos/pagination.dto';
import { DishDishDomainV2, DishDomainV2, DishSauceDomainV2 } from '../domains';
import { DishCreateDto } from './dish.dto';

export type TOperation = 'delete' | 'update' | 'none' | 'create';

export class SaucesPayloadDto {
  operation: TOperation;
  payload: DishSaucePayloadDto;
}

export class DishesPayloadDto {
  operation: TOperation;
  payload: DishDishPayloadDto;
}

export class DishSaucePayloadDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsNumber()
  readonly price: number;
  @Expose()
  @IsNumber()
  readonly sauceId: number;
}

export class DishDishPayloadDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsNumber()
  readonly price: number;
  @Expose()
  @IsNumber()
  readonly dishId: number;
}

/**
 * Create Dish Request
 */
export class DishPayloadCreateDto {
  @Expose()
  @Type(() => DishCreateDto)
  dishInfo: DishCreateDto;
  @Expose()
  @Type(() => DishSaucePayloadDto)
  sauces: DishSaucePayloadDto[];
  @Expose()
  @Type(() => DishDishPayloadDto)
  dishes: DishDishPayloadDto[];
}

export class DishesFilters {}

/**
 * Create Dish Request
 */
export class GetDishesByCategory extends PaginationPayload<DishesFilters> {
  @Expose()
  @IsNumber()
  categoryId: number;
  @Expose()
  @IsNumber()
  companyId: number;
}

/**
 * Update Dish Request
 */
export class DishPayloadUpdateDto {
  @Expose()
  @Type(() => DishCreateDto)
  dishInfo: DishCreateDto;
  @Expose()
  @Type(() => DishSaucePayloadDto)
  sauces: DishSaucePayloadDto[];
  @Expose()
  @Type(() => DishDishPayloadDto)
  dishes: DishDishPayloadDto[];
}

/**
 * Create Dish Response
 */
export class DishCreateResponseDto {
  @Expose()
  @Type(() => DishDomainV2)
  readonly dishInfo: DishDomainV2;
  @Expose()
  @Type(() => DishSauceDomainV2)
  readonly dishSauces: DishSauceDomainV2[];
  @Expose()
  @Type(() => DishDishDomainV2)
  readonly dishDishes: DishDishDomainV2[];
}

/**
 * Get Dish Response
 */
export class DishGetResponseDto {
  @Expose()
  @Type(() => DishDomainV2)
  readonly dishInfo: DishDomainV2;
  @Expose()
  @Type(() => DishSauceDomainV2)
  readonly dishSauces: DishSauceDomainV2[];
  @Expose()
  @Type(() => DishDishDomainV2)
  readonly dishDishes: DishDishDomainV2[];
}
