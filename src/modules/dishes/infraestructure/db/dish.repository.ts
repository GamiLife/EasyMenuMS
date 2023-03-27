import { Inject, Injectable } from '@nestjs/common';
import { FilteringPayload, PaginationPayload } from 'src/core/dtos';
import { PaginationRepository } from 'src/core/infraestructure/db';
import { Repo } from 'src/core/interfaces';
import { CombosEntity } from 'src/modules/combos/combos.entity';
import { CompanyEntity } from 'src/modules/companies/company.entity';
import { SauceEntity } from 'src/modules/sauces/sauces.entity';
import { DishProviders } from '../../application/dish.constants';
import { Dish } from '../../domain/dish.entity';
import { DishMapper } from '../mapper/dish.mapper';
import { DishModel } from './dish.model';

interface IDishCountWhere {
  categoryId?: number;
  companyId?: number;
}

export interface IDishRepo extends Repo<Dish, IDishCountWhere> {
  getDishById(id: number, companyId: number): Promise<Dish>;
  getDishBySlug(slug: string, companyId: number): Promise<Dish>;
  geDishCollection(
    pagination: PaginationPayload<any>,
    where: IDishCountWhere
  ): Promise<Dish[]>;
}

@Injectable()
export class DishRepository implements IDishRepo {
  constructor(
    @Inject(DishProviders.Model)
    private readonly dishModel: typeof DishModel
  ) {}

  private paginationRepo: PaginationRepository = new PaginationRepository(
    this.dishModel
  );

  private createBaseQuery() {
    return {
      where: {},
      include: [],
    };
  }

  private async getDish(
    fieldKey: string,
    fieldValue: string | number,
    companyId: number
  ) {
    const query = this.createBaseQuery();
    query.where[fieldKey] = fieldValue;
    query.include = [
      {
        model: CombosEntity,
        as: 'combos',
        attributes: [
          'id',
          'title',
          'description',
          'maxItems',
          //  ['dishesFromCombo', 'dishes'],
          // ['saucesFromCombo', 'sauces'],
        ],
        include: [
          {
            model: SauceEntity,
            attributes: [
              'id',
              'title',
              'description',
              'priceByUnit',
              'imageUrl',
              // ['ComboSauceEntity', 'detail'],
            ],
            as: 'saucesFromCombo',
            through: {
              attributes: ['maxItemsByRow', 'priceByUnit', 'id'],
            },
          },
          {
            model: DishModel,
            attributes: [
              'id',
              'title',
              'description',
              'priceByUnit',
              'imageUrl',
              // ['ComboDishesEntity', 'detail'],
            ],
            as: 'dishesFromCombo',
            through: {
              attributes: ['maxItemsByRow', 'priceByUnit', 'id'],
            },
          },
        ],
      },
      {
        model: CompanyEntity,
        as: 'company',
        attributes: ['id'],
        required: true,
        where: {
          id: companyId,
        },
      },
    ];
    query['attributes'] = [
      'id',
      'title',
      'description',
      'slug',
      'priceByUnit',
      'maxItems',
      'imageUrl',
    ];

    const instance = await this.dishModel.findOne(query);
    if (!instance) {
      return null;
    }
    return DishMapper.toDomainWithDetail(instance.dataValues);
  }

  async getDishBySlug(slug: string, companyId: number): Promise<Dish> {
    return await this.getDish('slug', slug, companyId);
  }

  async getDishById(id: number, companyId: number): Promise<Dish> {
    return await this.getDish('id', id, companyId);
  }

  async count(
    searchBy: FilteringPayload['searchBy'],
    searchOp: FilteringPayload['searchOp'],
    where: IDishCountWhere
  ): Promise<number> {
    const counter = await this.paginationRepo.count({
      where,
      searchBy,
      searchOp,
    });

    return counter;
  }

  async geDishCollection(
    pagination: PaginationPayload<any>,
    where: IDishCountWhere
  ): Promise<Dish[]> {
    const collection: DishModel[] = await this.paginationRepo.pagination({
      where,
      pagination,
    });

    return DishMapper.toDomains(collection.map((item) => item.dataValues));
  }

  async exists(dishId: number): Promise<boolean> {
    const query = this.createBaseQuery();
    query.where['id'] = dishId;

    const instance = await this.dishModel.findOne(query);
    return !!instance;
  }

  async save(dish: Dish): Promise<Dish> {
    const exists: boolean = await this.exists(dish.id);
    const rawDish = DishMapper.toPersistence(dish);

    try {
      if (exists) {
        await this.dishModel.update(rawDish, {
          where: { id: dish.id },
        });
        return dish;
      }
      await this.dishModel.create(rawDish);
      return dish;
    } catch (error) {
      throw new Error('Saving operation failed.');
    }
  }
}
