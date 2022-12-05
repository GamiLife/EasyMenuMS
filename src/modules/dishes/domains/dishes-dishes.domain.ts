import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsNumber } from 'class-validator';

import { AggregateRoot } from 'src/core/domain';
import { DishDomain, DishDomainV2 } from './dishes.domain';

export interface IDishDishProps {
  price: number;
  dish: DishDomain;
  dishSecond: DishDomain;
}

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
    return obj.dish;
  })
  @Type(() => DishDomainV2)
  dish: DishDomainV2;
  @Expose()
  @Transform(({ value, obj }) => {
    if (!value) {
      return { id: obj?.dishId };
    }
    return obj.dish;
  })
  @Type(() => DishDomainV2)
  dishSecond: DishDomainV2;
}

export class DishDishDomain extends AggregateRoot<IDishDishProps> {
  get price() {
    return this.props.price;
  }

  get dish() {
    return this.props.dish;
  }

  get dishSecond() {
    return this.props.dishSecond;
  }
}
