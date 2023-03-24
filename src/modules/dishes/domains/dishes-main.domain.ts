import {
  Expose,
  plainToClass,
  Transform,
  Type,
} from '@nestjs/class-transformer';
import { DishDishDomainV2, DishDomainV2, DishSauceDomainV2 } from '.';

/**
 * DishesMain Domain
 */
export class DishesMainDomainV2 {
  @Expose()
  @Type(() => DishDomainV2)
  readonly dishInfo: DishDomainV2;
  @Expose()
  @Transform(({ value }) =>
    value?.map((o) => plainToClass(DishSauceDomainV2, o))
  )
  readonly dishSauces?: DishSauceDomainV2[];
  @Expose()
  @Transform(({ value }) =>
    value?.map((o) => plainToClass(DishDishDomainV2, o))
  )
  readonly dishDishes?: DishDishDomainV2[];
}
