import { DishResponseDto } from './dish.dto';

export class DishDishCreateDto {
  readonly price: number;
  readonly dishId: number;
  readonly dishSecondId: number;
}

export class DishDishUpdateDto {
  readonly price: number;
  readonly dishId: number;
  readonly dishSecondId: number;
}

export class DishDishResponseDto {
  readonly id: number;
  readonly price: number;
  readonly dish: DishResponseDto;
  readonly dishSecond: DishResponseDto;
}
