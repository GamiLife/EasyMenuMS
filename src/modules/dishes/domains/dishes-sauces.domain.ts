import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsNumber } from 'class-validator';

import { SauceDomainV2 } from 'src/modules/sauces/sauces.domain';

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
}
