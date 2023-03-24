import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DISH_SAUCE_REPOSITORY } from 'src/core/constants';
import { DBError } from 'src/core/exceptions';
import { SaucesService } from 'src/modules/sauces/sauces.service';
import { DishSauceDomainV2 } from '../domains';
import { DishSauceCreateDto, DishSauceUpdateDto } from '../dtos';
import { DishSauceEntity } from '../entities';
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
