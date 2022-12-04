import { Injectable } from '@nestjs/common';
import {
  DishDishResponseDto,
  DishResponseDto,
  DishSauceResponseDto,
  DishCreateResponseDto,
} from '../dtos';
import { DishGetResponseDto, DishPayloadCreateDto } from '../dtos/main.dto';
import { DishesDishesService } from './dishes-dishes.service';
import { DishesSaucesService } from './dishes-sauces.service';
import { DishesService } from './dishes.service';

@Injectable()
export class DishesMainService {
  constructor(
    private readonly dishService: DishesService,
    private readonly dishSauceService: DishesSaucesService,
    private readonly dishDishService: DishesDishesService
  ) {}

  async create(
    dishPayload: DishPayloadCreateDto
  ): Promise<DishCreateResponseDto> {
    const { dishInfo, sauces, dishes } = dishPayload;

    const dishResponse: DishResponseDto = await this.dishService.create(
      dishInfo
    );
    const { id: dishId } = dishResponse;

    if (!dishId) return;

    const dishSaucesResponse: DishSauceResponseDto[] = [];
    const dishDishesResponse: DishDishResponseDto[] = [];

    for (const { price, sauceId } of sauces) {
      const sauceCreateDto = {
        price,
        sauceId,
        dishId,
      };
      const dishSauceDomain = await this.dishSauceService.create(
        sauceCreateDto
      );
      dishSaucesResponse.push(dishSauceDomain);
    }
    for (const { price, dishId: dishSecondId } of dishes) {
      const dishDishesCreateDto = {
        price,
        dishSecondId,
        dishId,
      };
      const dishDishDomain = await this.dishDishService.create(
        dishDishesCreateDto
      );
      dishDishesResponse.push(dishDishDomain);
    }

    return {
      dishInfo: dishResponse,
      dishSauces: dishSaucesResponse,
      dishDishes: dishDishesResponse,
    };
  }

  async findOneById(id: number): Promise<DishGetResponseDto> {
    const dishResponse = await this.dishService.findOneById(id);
    const dishSauces = await this.dishSauceService.findAllByDishId(id);
    const dishDishes = await this.dishDishService.findAllByDishId(id);

    return { dishInfo: dishResponse, dishSauces, dishDishes };
  }

  async findAll(): Promise<DishResponseDto[]> {
    const dishes = await this.dishService.findAll();

    return dishes;
  }
}
