import { Inject, Injectable } from '@nestjs/common';
import { DISH_DISH_REPOSITORY } from 'src/core/constants';
import {
  DishDishCreateDto,
  DishDishResponseDto,
  DishDishUpdateDto,
} from '../dtos';
import { DishDishesEntity, DishEntity } from '../entities';
import { DishDishMapper } from '../mappers';

@Injectable()
export class DishesDishesService {
  constructor(
    @Inject(DISH_DISH_REPOSITORY)
    private readonly dishDishesRepository: typeof DishDishesEntity
  ) {}

  async create(dishDish: DishDishCreateDto): Promise<DishDishResponseDto> {
    const dishDishCreated =
      await this.dishDishesRepository.create<DishDishesEntity>(dishDish);
    const dishDishDomain = DishDishMapper.entityToDomain(dishDishCreated);
    const dishDishResponse = DishDishMapper.domainToResponse(dishDishDomain);

    return dishDishResponse;
  }

  async findAllByDishId(dishId: number): Promise<DishDishResponseDto[]> {
    const dishDishesGet =
      await this.dishDishesRepository.findAll<DishDishesEntity>({
        where: { dishId },
        include: [
          {
            model: DishEntity,
            as: 'dish',
          },
          {
            model: DishEntity,
            as: 'dishSecond',
          },
        ],
      });
    const dishDishesDomain = DishDishMapper.entitiesToDomains(dishDishesGet);
    const dishDishesResponse =
      DishDishMapper.domainsToResponses(dishDishesDomain);

    return dishDishesResponse;
  }

  async findOneById(id: number): Promise<DishDishResponseDto> {
    const dishDishGet =
      await this.dishDishesRepository.findOne<DishDishesEntity>({
        where: { id },
        include: [
          {
            model: DishEntity,
          },
        ],
      });
    const dishDishDomain = DishDishMapper.entityToDomain(dishDishGet);
    const dishDishResponse = DishDishMapper.domainToResponse(dishDishDomain);

    return dishDishResponse;
  }

  async findAll(): Promise<DishDishResponseDto[]> {
    const dishDishes = await this.dishDishesRepository.findAll({
      include: [
        {
          model: DishEntity,
        },
      ],
    });
    const dishDishesDomain = DishDishMapper.entitiesToDomains(dishDishes);
    const dishDishesResponse =
      DishDishMapper.domainsToResponses(dishDishesDomain);

    return dishDishesResponse;
  }

  async update(
    dish: DishDishUpdateDto,
    id: number
  ): Promise<DishDishResponseDto> {
    await this.dishDishesRepository.update(dish, {
      where: { id },
    });
    const dishDishesDomain = DishDishMapper.updateDtoToDomain(dish);
    const dishDishesResponse =
      DishDishMapper.domainToResponse(dishDishesDomain);

    return dishDishesResponse;
  }
}
