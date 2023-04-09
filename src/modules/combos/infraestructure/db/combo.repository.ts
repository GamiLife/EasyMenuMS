import { Repo } from 'src/core/interfaces';
import { Combo } from '../../domain/Combo.entiy';
import { FilteringPayload, PaginationPayload } from 'src/core/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { ComboProviders } from '../../application/combo.constants';
import { CombosModel } from './combos.model';
import { PaginationRepository } from 'src/core/infraestructure/db';
import { DishModel } from 'src/modules/dishes/infraestructure/db/dish.model';
import { SauceModel } from 'src/modules/sauces/sauces.entity';
import { ComboMapper } from '../mapper/combo.mapper';
import { Guard } from 'src/core/helpers';
import { ComboDishesModel } from './combo-dishes.model';
import { ComboSauceModel } from './combo-sauces.model';
import { DishInCombo } from 'src/modules/dishes/domain/dishInCombo.entity';
import { SauceInCombo } from 'src/modules/sauces/domain/sauceInCombo.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IComboCountWhere {}

export interface IComboRepo extends Repo<Combo, IComboCountWhere> {
  getComboById(id: number): Promise<Combo>;
  getComboCollection(
    pagination: PaginationPayload<any>,
    where: IComboCountWhere
  ): Promise<Combo[]>;
  createDishesCombo(
    dishInCombo: DishInCombo,
    comboId: number
  ): Promise<DishInCombo>;
  createSaucesCombo(
    sauceInCombo: SauceInCombo,
    comboId: number
  ): Promise<SauceInCombo>;
  updateDishesCombo(
    dishInCombo: DishInCombo,
    comboId: number,
    id: number
  ): Promise<DishInCombo>;
  updateSaucesCombo(
    sauceInCombo: SauceInCombo,
    comboId: number,
    id: number
  ): Promise<SauceInCombo>;
  deleteDishCombo(id: number): Promise<void>;
  deleteSauceCombo(id: number): Promise<void>;
}

@Injectable()
export class ComboRepository implements IComboRepo {
  constructor(
    @Inject(ComboProviders.Model)
    private readonly comboModel: typeof CombosModel,
    @Inject(ComboProviders.ComboDishModel)
    private readonly comboDishModel: typeof ComboDishesModel,
    @Inject(ComboProviders.ComboSauceModel)
    private readonly comboSauceModel: typeof ComboSauceModel
  ) {}

  private paginationRepo: PaginationRepository = new PaginationRepository(
    this.comboModel
  );

  private createBaseQuery() {
    return {
      where: {},
      include: [],
    };
  }

  async getComboById(id: number): Promise<Combo> {
    const query = this.createBaseQuery();
    query.where['id'] = id;
    query.include = [
      {
        model: DishModel,
        as: 'dishCombo',
        attributes: [
          'id',
          'title',
          'description',
          'priceByUnit',
          'imageUrl',
          'maxItems',
        ],
      },
      {
        model: SauceModel,
        attributes: ['id', 'title', 'description', 'priceByUnit', 'imageUrl'],
        as: 'saucesFromCombo',
        through: {
          attributes: ['maxItemsByRow', 'priceByUnit', 'id'],
        },
      },
      {
        model: DishModel,
        attributes: ['id', 'title', 'description', 'priceByUnit', 'imageUrl'],
        as: 'dishesFromCombo',
        through: {
          attributes: ['maxItemsByRow', 'priceByUnit', 'id'],
        },
      },
    ];

    query['attributes'] = ['id', 'title', 'description', 'maxItems'];

    const instance: CombosModel = await this.comboModel.findOne(query);
    if (!instance) {
      return null;
    }
    return ComboMapper.toDomainWithDetail(instance.dataValues);
  }

  async count(
    searchBy: FilteringPayload['searchBy'],
    searchOp: FilteringPayload['searchOp'],
    where: IComboCountWhere
  ): Promise<number> {
    const counter = await this.paginationRepo.count({
      where: Guard.removeNullOrUndefined(where),
      searchBy,
      searchOp,
    });

    return counter;
  }

  async getComboCollection(
    pagination: PaginationPayload<any>,
    where: IComboCountWhere
  ): Promise<Combo[]> {
    const collection: CombosModel[] = await this.paginationRepo.pagination({
      where: Guard.removeNullOrUndefined(where),
      pagination,
    });

    return ComboMapper.toDomains(collection.map((item) => item.dataValues));
  }

  async exists(comboId: number): Promise<boolean> {
    try {
      const query = this.createBaseQuery();
      query.where['id'] = comboId;

      const instance = await this.comboModel.findOne(query);
      return !!instance;
    } catch (error) {
      return false;
    }
  }

  async save(combo: Combo): Promise<Combo> {
    const exists: boolean = await this.exists(combo.id);
    const rawCombo = ComboMapper.toPersistence(combo);

    try {
      if (exists) {
        await this.comboModel.update(rawCombo, {
          where: { id: combo.id },
        });
        return combo;
      }
      const instance = await this.comboModel.create(rawCombo);
      combo.id = instance.id;
      return combo;
    } catch (error) {
      throw new Error('Saving operation failed.');
    }
  }

  async createDishesCombo(
    dishInCombo: DishInCombo,
    comboId: number
  ): Promise<DishInCombo> {
    try {
      const raw = ComboMapper.toDishInComboPersistence(dishInCombo, comboId);
      await this.comboDishModel.create(raw);
      return dishInCombo;
    } catch (error) {
      console.log('test', error);
      throw new Error('Method not implemented.');
    }
  }

  async createSaucesCombo(
    sauceInCombo: SauceInCombo,
    comboId: number
  ): Promise<SauceInCombo> {
    try {
      const raw = ComboMapper.toSauceInComboPersistence(sauceInCombo, comboId);
      await this.comboSauceModel.create(raw);
      return sauceInCombo;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }

  async updateDishesCombo(
    dishInCombo: DishInCombo,
    comboId: number,
    id: number
  ): Promise<DishInCombo> {
    try {
      const raw = ComboMapper.toDishInComboPersistence(dishInCombo, comboId);
      await this.comboDishModel.update(raw, {
        where: { id },
      });
      return dishInCombo;
    } catch (error) {
      throw new Error('Error on update');
    }
  }

  async updateSaucesCombo(
    sauceInCombo: SauceInCombo,
    comboId: number,
    id: number
  ): Promise<SauceInCombo> {
    try {
      const raw = ComboMapper.toSauceInComboPersistence(sauceInCombo, comboId);
      await this.comboSauceModel.update(raw, {
        where: { id },
      });
      return sauceInCombo;
    } catch (error) {
      throw new Error('Error on update');
    }
  }

  async deleteDishCombo(id: number): Promise<void> {
    try {
      await this.comboDishModel.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('Error on delete');
    }
  }
  async deleteSauceCombo(id: number): Promise<void> {
    try {
      await this.comboSauceModel.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('Error on delete');
    }
  }
}
