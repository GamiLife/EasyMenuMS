import { Expose, Type } from '@nestjs/class-transformer';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { DishResponseDto } from './dish.dto';

/**
 * Request on create dishDish
 */
export class DishDishCreateDto {
  @IsNumber()
  readonly price: number;
  @IsNotEmpty({ message: 'DishId required' })
  @IsNumber()
  readonly dishId: number;
  @IsNotEmpty({ message: 'Second DishId required' })
  @IsNumber()
  readonly dishSecondId: number;
}

/**
 * Request on update dishDish
 */
export class DishDishUpdateDto {
  @Expose()
  @IsNumber()
  readonly price: number;
  @Expose()
  @IsNotEmpty({ message: 'DishId required' })
  @IsNumber()
  readonly dishId: number;
  @Expose()
  @IsNotEmpty({ message: 'Second DishId required' })
  @IsNumber()
  readonly dishSecondId: number;
}

/**
 * DishDishDto
 */
export class DishDishResponseDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsNumber()
  readonly price: number;
  @Expose()
  @Type(() => DishResponseDto)
  readonly dishSecond: DishResponseDto;
}
