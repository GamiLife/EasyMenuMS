import { Expose, Type } from '@nestjs/class-transformer';
import { IsNumber, IsNotEmpty } from 'class-validator';

import { SauceResponseDto } from 'src/modules/sauces/sauces.dto';

/**
 * Request on create dishSauce
 */
export class DishSauceCreateDto {
  @IsNumber()
  readonly price: number;
  @IsNotEmpty({ message: 'DishId required' })
  @IsNumber()
  readonly dishId: number;
  @IsNotEmpty({ message: 'SauceId required' })
  @IsNumber()
  readonly sauceId: number;
}

/**
 * Request on update dishSauce
 */
export class DishSauceUpdateDto {
  @IsNumber()
  readonly price: number;
  @IsNotEmpty({ message: 'DishId required' })
  @IsNumber()
  readonly dishId: number;
  @IsNotEmpty({ message: 'SauceId required' })
  @IsNumber()
  readonly sauceId: number;
}

/**
 * DishSauceDto
 */
export class DishSauceResponseDto {
  @Expose()
  @IsNumber()
  readonly id: number;
  @IsNotEmpty({ message: 'DishId required' })
  @IsNumber()
  readonly price: number;
  @Expose()
  @Type(() => SauceResponseDto)
  readonly sauce: SauceResponseDto;
}
