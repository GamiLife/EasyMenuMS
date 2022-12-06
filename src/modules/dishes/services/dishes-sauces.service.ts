import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DISH_SAUCE_REPOSITORY } from 'src/core/constants';
import { DBError, EmptyError } from 'src/core/exceptions';
import { SauceEntity } from 'src/modules/sauces/sauces.entity';
import { SaucesService } from 'src/modules/sauces/sauces.service';
import { DishSauceDomainV2 } from '../domains';
import { DishSauceCreateDto, DishSauceUpdateDto } from '../dtos';
import { DishEntity, DishSauceEntity } from '../entities';
import { DishesService } from './dishes.service';
import { plainToClass } from '@nestjs/class-transformer';

@Injectable()
export class DishesSaucesService {
  constructor(
    @Inject(DISH_SAUCE_REPOSITORY)
    private readonly dishSaucesRepository: typeof DishSauceEntity,
    private readonly sauceService: SaucesService,
    private readonly dishService: DishesService
  ) {}

  async create(dishSauce: DishSauceCreateDto): Promise<DishSauceDomainV2> {
    await this.sauceService.findOneById(dishSauce.sauceId);
    await this.dishService.findOneById(dishSauce.dishId);

    const dishSauceEntity = await this.dishSaucesRepository
      .create<DishSauceEntity>(dishSauce)
      .catch((reason) => {
        throw new DBError(
          `DishSauce query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (!dishSauceEntity) {
      throw new DBError('DishSauce query failed', HttpStatus.BAD_REQUEST);
    }

    const dishSauceDomain = plainToClass(DishSauceDomainV2, dishSauceEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return dishSauceDomain;
  }

  async findAllByDishId(dishId: number): Promise<DishSauceDomainV2[]> {
    const dishesSauceGetEntity =
      await this.dishSaucesRepository.findAll<DishSauceEntity>({
        where: { dishId },
        include: [
          {
            model: SauceEntity,
          },
        ],
      });

    if (!dishesSauceGetEntity) {
      throw new EmptyError('DishSauce not found', HttpStatus.NOT_FOUND);
    }

    const dishSaucesDomain = plainToClass(
      DishSauceDomainV2,
      dishesSauceGetEntity,
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }
    );

    return dishSaucesDomain;
  }

  async findOneById(id: number): Promise<DishSauceDomainV2> {
    const dishSauceGetEntity =
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

    if (!dishSauceGetEntity) {
      throw new EmptyError('DishSauce not found', HttpStatus.NOT_FOUND);
    }

    const dishSauceDomain = plainToClass(
      DishSauceDomainV2,
      dishSauceGetEntity,
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }
    );

    return dishSauceDomain;
  }

  async findAll(): Promise<DishSauceDomainV2[]> {
    const dishSaucesEntity = await this.dishSaucesRepository.findAll({
      include: [
        {
          model: DishEntity,
          attributes: ['id'],
          required: true,
        },
      ],
    });

    const dishSaucesDomain = dishSaucesEntity.map((dishSauceEntity) =>
      plainToClass(DishSauceDomainV2, dishSauceEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    return dishSaucesDomain;
  }

  async update(
    dishSauce: DishSauceUpdateDto,
    id: number
  ): Promise<DishSauceDomainV2> {
    await this.sauceService.findOneById(dishSauce.sauceId);
    await this.dishService.findOneById(dishSauce.dishId);

    await this.dishSaucesRepository
      .update(dishSauce, {
        where: { id },
      })
      .catch((reason) => {
        throw new DBError(
          `DishSauce query failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    const dishSaucesDomain = plainToClass(DishSauceDomainV2, dishSauce, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return dishSaucesDomain;
  }
}
