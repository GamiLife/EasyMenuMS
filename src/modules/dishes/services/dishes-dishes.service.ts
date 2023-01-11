import { plainToClass } from "@nestjs/class-transformer";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DISH_DISH_REPOSITORY } from "src/core/constants";
import { DBError, EmptyError } from "src/core/exceptions";
import { DishDishDomainV2 } from "../domains";
import { DishDishCreateDto, DishDishUpdateDto } from "../dtos";
import { DishDishesEntity, DishEntity } from "../entities";
import { DishesService } from "./dishes.service";

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
      throw new DBError("DishDish query failed", HttpStatus.BAD_REQUEST);
    }

    const dishDishDomain = plainToClass(DishDishDomainV2, dishDishEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return dishDishDomain;
  }

  async findAllByDishId(dishId: number): Promise<DishDishDomainV2[]> {
    const dishDishesGetEntity =
      await this.dishDishesRepository.findAll<DishDishesEntity>({
        where: { dishId },
        include: [
          {
            model: DishEntity,
            as: "dishSecond",
          },
        ],
      });

    if (!dishDishesGetEntity) {
      throw new EmptyError("DishDish not found", HttpStatus.NOT_FOUND);
    }

    const dishDishesDomain = plainToClass(
      DishDishDomainV2,
      dishDishesGetEntity,
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }
    );

    return dishDishesDomain;
  }

  async findOneById(id: number): Promise<DishDishDomainV2> {
    const dishDishGetEntity =
      await this.dishDishesRepository.findOne<DishDishesEntity>({
        where: { id },
        include: [
          {
            model: DishEntity,
          },
        ],
      });

    if (!dishDishGetEntity) {
      throw new EmptyError("DishId not found", HttpStatus.NOT_FOUND);
    }

    const dishDishesDomain = plainToClass(DishDishDomainV2, dishDishGetEntity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    return dishDishesDomain;
  }

  async findAll(): Promise<DishDishDomainV2[]> {
    const dishDishesEntity = await this.dishDishesRepository.findAll({
      include: [
        {
          model: DishEntity,
          attributes: ["id"],
          required: true,
        },
      ],
    });

    const dishDishesDomain = dishDishesEntity.map((dishDishEntity) =>
      plainToClass(DishDishDomainV2, dishDishEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    return dishDishesDomain;
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
