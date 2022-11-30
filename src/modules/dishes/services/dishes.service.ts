import { Inject, Injectable } from '@nestjs/common';
import { DISH_REPOSITORY } from 'src/core/constants';
import { CategoryEntity } from '../../categories/categories.entity';
import { CompanyEntity } from '../../companies/company.entity';
import { DishCreateDto, DishResponseDto, DishUpdateDto } from '../dtos';
import { DishEntity } from '../entities/dishes.entity';
import { DishMapper } from '../mappers/dish.mapper';

@Injectable()
export class DishesService {
  constructor(
    @Inject(DISH_REPOSITORY)
    private readonly dishRepository: typeof DishEntity
  ) {}

  async create(dish: DishCreateDto): Promise<DishResponseDto> {
    const dishCreated = await this.dishRepository.create<DishEntity>(dish);
    const dishDomain = DishMapper.entityToDomain(dishCreated);
    const dishResponse = DishMapper.domainToResponse(dishDomain);

    return dishResponse;
  }

  async findOneById(id: number): Promise<DishResponseDto> {
    const dishGet = await this.dishRepository.findOne<DishEntity>({
      where: { id },
      include: [
        {
          model: CategoryEntity,
        },
        {
          model: CompanyEntity,
        },
      ],
    });
    const dishDomain = DishMapper.entityToDomain(dishGet);
    const dishResponse = DishMapper.domainToResponse(dishDomain);

    return dishResponse;
  }

  async findAll(): Promise<DishResponseDto[]> {
    try {
      const dishs = await this.dishRepository.findAll({
        include: [
          {
            model: CategoryEntity,
          },
          {
            model: CompanyEntity,
          },
        ],
      });
      const dishsDomain = DishMapper.entitiesToDomains(dishs);
      const dishsResponse = DishMapper.domainsToResponses(dishsDomain);

      return dishsResponse;
    } catch (error) {
      console.log('test', error);
      return [];
    }
  }

  async update(dish: DishUpdateDto, id: number): Promise<DishResponseDto> {
    await this.dishRepository.update(dish, {
      where: { id },
    });
    const dishDomain = DishMapper.updateDtoToDomain(dish);
    const dishResponse = DishMapper.domainToResponse(dishDomain);

    return dishResponse;
  }
}
