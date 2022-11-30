import { Inject, Injectable } from '@nestjs/common';
import { DISH_SAUCE_REPOSITORY } from 'src/core/constants';
import { SauceEntity } from 'src/modules/sauces/sauces.entity';
import {
  DishSauceCreateDto,
  DishSauceResponseDto,
  DishSauceUpdateDto,
} from '../dtos';
import { DishEntity, DishSauceEntity } from '../entities';
import { DishSauceMapper } from '../mappers';

@Injectable()
export class DishesSaucesService {
  constructor(
    @Inject(DISH_SAUCE_REPOSITORY)
    private readonly dishSaucesRepository: typeof DishSauceEntity
  ) {}

  async create(dishDish: DishSauceCreateDto): Promise<DishSauceResponseDto> {
    const dishSauceCreated =
      await this.dishSaucesRepository.create<DishSauceEntity>(dishDish);
    const dishSauceDomain = DishSauceMapper.entityToDomain(dishSauceCreated);
    const dishSauceResponse = DishSauceMapper.domainToResponse(dishSauceDomain);

    return dishSauceResponse;
  }

  async findAllByDishId(dishId: number): Promise<DishSauceResponseDto[]> {
    const dishesSauceGet =
      await this.dishSaucesRepository.findAll<DishSauceEntity>({
        where: { dishId },
        include: [
          {
            model: DishEntity,
          },
          {
            model: SauceEntity,
          },
        ],
      });
    const dishSaucesDomain = DishSauceMapper.entitiesToDomains(dishesSauceGet);
    const dishSaucesResponse =
      DishSauceMapper.domainsToResponses(dishSaucesDomain);

    return dishSaucesResponse;
  }

  async findOneById(id: number): Promise<DishSauceResponseDto> {
    const dishSauceGet =
      await this.dishSaucesRepository.findOne<DishSauceEntity>({
        where: { id },
        include: [
          {
            model: DishEntity,
          },
          {
            model: SauceEntity,
          },
        ],
      });
    const dishSauceDomain = DishSauceMapper.entityToDomain(dishSauceGet);
    const dishSauceResponse = DishSauceMapper.domainToResponse(dishSauceDomain);

    return dishSauceResponse;
  }

  async findAll(): Promise<DishSauceResponseDto[]> {
    const dishSauces = await this.dishSaucesRepository.findAll({
      include: [
        {
          model: DishEntity,
        },
      ],
    });
    const dishSaucesDomain = DishSauceMapper.entitiesToDomains(dishSauces);
    const dishSaucesResponse =
      DishSauceMapper.domainsToResponses(dishSaucesDomain);

    return dishSaucesResponse;
  }

  async update(
    dishSauce: DishSauceUpdateDto,
    id: number
  ): Promise<DishSauceResponseDto> {
    await this.dishSaucesRepository.update(dishSauce, {
      where: { id },
    });
    const dishSaucesDomain = DishSauceMapper.updateDtoToDomain(dishSauce);
    const dishSaucesResponse =
      DishSauceMapper.domainToResponse(dishSaucesDomain);

    return dishSaucesResponse;
  }
}
