import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DISH_REPOSITORY } from 'src/core/constants';
import { DBError, EmptyError } from 'src/core/exceptions';
import { CategoryEntity } from '../../categories/categories.entity';
import { CompanyEntity } from '../../companies/company.entity';
import { DishDomainV2 } from '../domains';
import {
  DishCreateDto,
  DishResponseDto,
  DishUpdateDto,
  PayloadPagination,
} from '../dtos';
import { DishEntity } from '../entities/dishes.entity';
import { DishMapper } from '../mappers/dish.mapper';

@Injectable()
export class DishesService {
  constructor(
    @Inject(DISH_REPOSITORY)
    private readonly dishRepository: typeof DishEntity
  ) {}

  async create(dish: DishCreateDto): Promise<DishDomainV2> {
    const dishCreatedEntity = await this.dishRepository
      .create<DishEntity>(dish)
      .catch((reason) => {
        throw new DBError(
          `Dish query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!dishCreatedEntity) {
      throw new DBError('Dish query failed', HttpStatus.BAD_REQUEST);
    }

    const dishDomain = plainToClass(DishDomainV2, dishCreatedEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return dishDomain;
  }

  async findOneById(id: number): Promise<DishDomainV2> {
    const dishGetEntity = await this.dishRepository.findOne<DishEntity>({
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

    if (!dishGetEntity) {
      throw new EmptyError('DishId not found', HttpStatus.NOT_FOUND);
    }

    const dishDomain = plainToClass(DishDomainV2, dishGetEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return dishDomain;
  }

  async findAllByCategoryId(
    categoryId: number,
    { page, size }: PayloadPagination
  ): Promise<DishDomainV2[]> {
    try {
      const dishsEntity = await this.dishRepository.findAll({
        include: [
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
        limit: size,
        offset: page * size,
      });

      const dishDomain = dishsEntity.map((dishEntity) =>
        plainToClass(DishDomainV2, dishEntity, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        })
      );

      return dishDomain;
    } catch (error) {
      console.log('test', error);
      return [];
    }
  }

  async findAll(): Promise<DishDomainV2[]> {
    try {
      const dishsEntity = await this.dishRepository.findAll({
        include: [
          {
            model: CategoryEntity,
            attributes: ['id'],
            required: true,
          },
          {
            model: CompanyEntity,
            attributes: ['id'],
            required: true,
          },
        ],
      });

      const dishDomain = dishsEntity.map((dishEntity) =>
        plainToClass(DishDomainV2, dishEntity, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        })
      );

      return dishDomain;
    } catch (error) {
      console.log('test', error);
      return [];
    }
  }

  async update(dish: DishUpdateDto, id: number): Promise<DishDomainV2> {
    await this.dishRepository
      .update(dish, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `Dish query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const dishDomain = plainToClass(DishDomainV2, dish, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return dishDomain;
  }
}
