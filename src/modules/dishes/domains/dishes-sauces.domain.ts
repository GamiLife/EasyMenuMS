import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsNumber } from 'class-validator';

import { AggregateRoot } from 'src/core/domain';
import { SauceDomain, SauceDomainV2 } from 'src/modules/sauces/sauces.domain';
import { DishDomain, DishDomainV2 } from './dishes.domain';

export interface IDishSauceProps {
  price: number;
  sauce: SauceDomain;
  dish: DishDomain;
}

export class DishSauceDomainV2 {
  @Expose()
  @IsNumber()
  id?: number;
  @Expose()
  @IsNumber()
  price: number;
  @Expose()
  @Transform(({ value, obj }) => {
    if (!value) {
      return { id: obj?.sauceId };
    }
    return obj.sauce;
  })
  @Type(() => SauceDomainV2)
  sauce: SauceDomainV2;
  @Expose()
  @Transform(({ value, obj }) => {
    if (!value) {
      return { id: obj?.dishId };
    }
    return obj.dish;
  })
  @Type(() => DishDomainV2)
  dish: DishDomainV2;
}

export class DishSauceDomain extends AggregateRoot<IDishSauceProps> {
  get price() {
    return this.props.price;
  }

  get sauce() {
    return this.props.sauce;
  }

  get dish() {
    return this.props.dish;
  }
}
