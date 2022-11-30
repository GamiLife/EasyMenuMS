import { SauceResponseDto } from 'src/modules/sauces/sauces.dto';
import { DishResponseDto } from './dish.dto';

export class DishSauceCreateDto {
  readonly price: number;
  readonly dishId: number;
  readonly sauceId: number;
}

export class DishSauceUpdateDto {
  readonly price: number;
  readonly dishId: number;
  readonly sauceId: number;
}

export class DishSauceResponseDto {
  readonly id: number;
  readonly price: number;
  readonly dish: DishResponseDto;
  readonly sauce: SauceResponseDto;
}
