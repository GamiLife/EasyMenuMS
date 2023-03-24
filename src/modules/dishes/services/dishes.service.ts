import { plainToClass } from '@nestjs/class-transformer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { DISH_REPOSITORY } from 'src/core/constants';
import { MetaDomain } from 'src/core/domain';
import { EmptyError } from 'src/core/exceptions';
import { MetaFactory } from 'src/core/factories';
import { BaseService } from 'src/core/services';
import { CategoryEntity } from 'src/modules/categories/categories.entity';
import { CombosEntity } from 'src/modules/combos/combos.entity';
import { CompanyEntity } from 'src/modules/companies/company.entity';
import { SauceEntity } from 'src/modules/sauces/sauces.entity';
import { DishDomainV2 } from '../domains';
import { DishesMainDomainV2 } from '../domains/dishes-main.domain';
import { DishCreateResponseDto, DishDetailResponseDto } from '../dtos';
import { DishPayloadCreateDto, GetDishesByCategory } from '../dtos/main.dto';
import { DishDishesEntity, DishEntity, DishSauceEntity } from '../entities';

const filter: FindOptions['include'] = [
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
  {
    model: CombosEntity,
    attributes: ['id', 'title', 'description', 'maxItems'],
    as: 'dishSauceWithCombos',
    through: { attributes: ['maxSauces', 'price', 'id'] },
    include: [
      {
        model: SauceEntity,
        attributes: ['id', 'title', 'description', 'price', 'imageUrl'],
        as: 'comboSauceFromDishSauce',
        through: { attributes: [] },
      },
    ],
  },
  {
    model: CombosEntity,
    attributes: ['id', 'title', 'description', 'maxItems'],
    as: 'dishDishWithCombos',
    through: { attributes: ['maxSecondaryDishes', 'price', 'id'] },
    include: [
      {
        model: DishEntity,
        attributes: ['id', 'title', 'description', 'price', 'imageUrl'],
        as: 'comboSecondDishFromDishDish',
        through: { attributes: [] },
      },
    ],
  },
];

@Injectable()
export class DishesService extends BaseService {
  constructor(
    @Inject(DISH_REPOSITORY)
    private readonly dishRepository: typeof DishEntity
  ) {
    super(dishRepository);
  }

  async create(
    dishPayload: DishPayloadCreateDto
  ): Promise<DishCreateResponseDto> {
    const { dishInfo, sauces, dishes } = dishPayload;
    /*
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
*/
    return {
      dishInfo: null,
      dishSauces: null,
      dishDishes: null,
    };
  }

  async findOneByField<T>(
    fieldName: 'id' | 'slug',
    fieldValue: string | number,
    filtersRepo: FindOptions<T>['include']
  ) {
    const dishEntity = await this.dishRepository.findOne<DishEntity>({
      where: { [fieldName]: fieldValue },
      include: filtersRepo,
    });

    if (!dishEntity) {
      throw new EmptyError('DishId not found', HttpStatus.NOT_FOUND);
    }

    return dishEntity;
  }

  async findOneById(id: number): Promise<any> {
    const dishDetailEntity = await this.findOneByField('id', id, filter);

    const dishDetail = plainToClass(DishDetailResponseDto, dishDetailEntity, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });

    return dishDetail;
  }

  async findOneBySlug(slug: string): Promise<any> {
    const dishDetailEntity = await this.findOneByField('slug', slug, filter);

    const dishDetail = plainToClass(DishDetailResponseDto, dishDetailEntity, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });

    return dishDetail;
  }

  async findAll(): Promise<DishDomainV2[]> {
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
  }

  async findAllByPagination({
    categoryId,
    companyId,
    ...pagination
  }: GetDishesByCategory): Promise<MetaDomain<DishDomainV2[]>> {
    const filtersRepo = [
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
        where: {
          id: companyId,
        },
      },
    ];

    const dishesCounter = await this.count({
      filtersRepo,
      searchCol: 'title',
      search: pagination.search,
    });

    const dishsEntity = await this.pagination<DishEntity[]>({
      filtersRepo,
      pagination,
      searchCol: 'title',
      searchColFilters: `DishEntity.title`,
    });

    const dishDomain = dishsEntity.map((dishEntity) =>
      plainToClass(DishDomainV2, dishEntity, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      })
    );

    const metaResponse = MetaFactory.create<DishDomainV2[]>({
      pagination,
      totalItems: dishesCounter,
      data: dishDomain,
    });

    return metaResponse;
  }
}
