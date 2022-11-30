import { DishSauceResponseDto } from '.';
import { DishDishResponseDto } from './dish-dish.dto';
import { DishCreateDto, DishResponseDto, DishUpdateDto } from './dish.dto';

export type TOperation = 'delete' | 'update' | 'none' | 'create';

export class DishSaucePayloadDto {
  readonly id: number;
  readonly price: number;
  readonly sauceId: number;
}

export class DishDishPayloadDto {
  readonly id: number;
  readonly price: number;
  readonly dishId: number;
}

export class SaucesPayloadDto {
  operation: TOperation;
  payload: DishSaucePayloadDto;
}

export class DishesPayloadDto {
  operation: TOperation;
  payload: DishDishPayloadDto;
}

export class DishPayloadCreateDto {
  dishInfo: DishCreateDto;
  sauces: DishSaucePayloadDto[];
  dishes: DishDishPayloadDto[];
}

export class DishPayloadUpdateDto {
  dishInfo: DishUpdateDto;
  sauces: SaucesPayloadDto[];
  dishes: DishesPayloadDto[];
}

export class DishCreateResponseDto {
  readonly dishInfo: DishResponseDto;
  readonly dishSauces: DishSauceResponseDto[];
  readonly dishDishes: DishDishResponseDto[];
}

export class DishGetResponseDto {
  readonly dishInfo: DishResponseDto;
  readonly dishSauces: DishSauceResponseDto[];
  readonly dishDishes: DishDishResponseDto[];
}
