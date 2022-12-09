import { Injectable } from '@nestjs/common';
import { MetaDomain } from 'src/core/domain';
import { PaginationPayload } from 'src/core/dtos';
import { EmptyError } from 'src/core/exceptions';
import { MetaFactory } from 'src/core/factories';
import { CategoryEntity } from 'src/modules/categories/categories.entity';
import { CompanyEntity } from 'src/modules/companies/company.entity';
import { DishDishDomainV2, DishDomainV2, DishSauceDomainV2 } from '../domains';
import { DishesMainDomainV2 } from '../domains/dishes-main.domain';
import { DishCreateResponseDto } from '../dtos';
import { DishPayloadCreateDto, GetDishesByCategory } from '../dtos/main.dto';
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

    if (!dishId) {
      throw new EmptyError('Dish Created empty error');
    }

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

  async findOneById(id: number): Promise<DishesMainDomainV2> {
    const dishInfo = await this.dishService.findOneById(id);
    const dishSauces = await this.dishSauceService.findAllByDishId(id);
    const dishDishes = await this.dishDishService.findAllByDishId(id);

    return { dishInfo, dishSauces, dishDishes };
  }

  async findAll(): Promise<DishDomainV2[]> {
    const dishes = await this.dishService.findAll();

    return dishes;
  }

  async findAllByCategoryId(
    categoryId: number,
    pagination: GetDishesByCategory
  ): Promise<MetaDomain<DishDomainV2[]>> {
    const dishesCounter = await this.dishService.count({
      filtersRepo: [
        {
          model: CategoryEntity,
          attributes: ['id'],
          required: true,
          where: {
            id: categoryId,
          },
        },
        {
          model: CompanyEntity,
          attributes: ['id'],
          required: true,
        },
      ],
    });
    const dishesDomain = await this.dishService.findAllByCategoryId(
      categoryId,
      pagination
    );

    const metaResponse = MetaFactory.create<DishDomainV2[]>({
      pagination,
      totalItems: dishesCounter,
      data: dishesDomain,
    });

    return metaResponse;
  }
}
