import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsNumber } from 'class-validator';

import { DishDomainV2 } from './dishes.domain';

/**
 * DishDish Domain
 */
export class DishDishDomainV2 {
  @Expose()
  @IsNumber()
  id?: number;
  @Expose()
  @IsNumber()
  price: number;
  @Expose()
  @Transform(({ value, obj }) => {
    if (!value) {
      return { id: obj?.dishId };
    }
    return obj.dishSecond;
  })
  @Type(() => DishDomainV2)
  dishSecond: DishDomainV2;
}
