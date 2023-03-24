import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DISH_DISH_REPOSITORY } from 'src/core/constants';
import { DBError } from 'src/core/exceptions';
import { DishDishDomainV2 } from '../domains';
import { DishDishCreateDto, DishDishUpdateDto } from '../dtos';
import { DishDishesEntity } from '../entities';
import { DishesService } from './dishes.service';

@Injectable()
export class DishesDishesService {
  constructor(
    @Inject(DISH_DISH_REPOSITORY)
    private readonly dishDishesRepository: typeof DishDishesEntity,
    private readonly dishService: DishesService
  ) {}

  async create(dishDish: DishDishCreateDto): Promise<DishDishDomainV2> {
    await this.dishService.findOneById(dishDish.dishId);
    await this.dishService.findOneById(dishDish.dishSecondId);

    const dishDishEntity = await this.dishDishesRepository
      .create<DishDishesEntity>(dishDish)
      .catch((reason) => {
        throw new DBError(
          `DishDish query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!dishDishEntity) {
      throw new DBError('DishDish query failed', HttpStatus.BAD_REQUEST);
    }

    const dishDishDomain = plainToClass(DishDishDomainV2, dishDishEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return dishDishDomain;
  }

  async update(
    dishDish: DishDishUpdateDto,
    id: number
  ): Promise<DishDishDomainV2> {
    await this.dishService.findOneById(dishDish.dishId);
    await this.dishService.findOneById(dishDish.dishSecondId);

    await this.dishDishesRepository
      .update(dishDish, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `DishDish query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const dishDishesDomain = plainToClass(DishDishDomainV2, dishDish, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return dishDishesDomain;
  }
}
