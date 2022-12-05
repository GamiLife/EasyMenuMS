import { Injectable } from '@nestjs/common';
import { DishDishDomainV2, DishDomainV2, DishSauceDomainV2 } from '../domains';
import { DishCreateResponseDto } from '../dtos';
import {
  DishGetResponseDto,
  DishPayloadCreateDto,
  PayloadPagination,
} from '../dtos/main.dto';
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

    const dishResponse: DishDomainV2 = await this.dishService.create(dishInfo);
    const { id: dishId } = dishResponse;

    if (!dishId) return;

    const dishSaucesResponse: DishSauceDomainV2[] = [];
    const dishDishesResponse: DishDishDomainV2[] = [];

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

  async findAll(): Promise<DishDomainV2[]> {
    const dishes = await this.dishService.findAll();

    return dishes;
  }

  async findAllByCategoryId(
    categoryId: number,
    pagination: PayloadPagination
  ): Promise<DishDomainV2[]> {
    const dishes = await this.dishService.findAllByCategoryId(
      categoryId,
      pagination
    );

    return dishes;
  }
}
