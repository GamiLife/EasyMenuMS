import { Inject, Injectable } from '@nestjs/common';
import { FilteringPayload, PaginationPayload } from 'src/core/dtos';
import { Guard } from 'src/core/helpers';
import { PaginationRepository } from 'src/core/infraestructure/db';
import { Repo } from 'src/core/interfaces';
import { History } from '../../domain/history.entity';
import { ReportProviders } from '../../application/report.constants';
import { HistoryModel } from './history.model';
import { HistoryMapper } from '../mapper/history.mapper';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IHistoryCountWhere {}

export interface IDishRepo extends Repo<History, IHistoryCountWhere> {
  geDishCollection(
    pagination: PaginationPayload<any>,
    where: IHistoryCountWhere
  ): Promise<History[]>;
}

@Injectable()
export class HistoryRepository implements IDishRepo {
  constructor(
    @Inject(ReportProviders.Model)
    private readonly historyModel: typeof HistoryModel
  ) {}

  private paginationRepo: PaginationRepository = new PaginationRepository(
    this.historyModel
  );

  private createBaseQuery() {
    return {
      where: {},
      include: [],
    };
  }

  async count(
    searchBy: FilteringPayload['searchBy'],
    searchOp: FilteringPayload['searchOp'],
    where: IHistoryCountWhere
  ): Promise<number> {
    const counter = await this.paginationRepo.count({
      where: Guard.removeNullOrUndefined(where),
      searchBy,
      searchOp,
    });

    return counter;
  }

  async geDishCollection(
    pagination: PaginationPayload<any>,
    where: IHistoryCountWhere
  ): Promise<History[]> {
    const collection: HistoryModel[] = await this.paginationRepo.pagination({
      where: Guard.removeNullOrUndefined(where),
      pagination,
    });

    return HistoryMapper.toDomains(collection.map((item) => item.dataValues));
  }

  async exists(dishId: number): Promise<boolean> {
    try {
      const query = this.createBaseQuery();
      query.where['id'] = dishId;

      const instance = await this.historyModel.findOne(query);
      return !!instance;
    } catch (error) {
      return false;
    }
  }

  async save(dish: History): Promise<History> {
    const exists: boolean = await this.exists(dish.id);
    const rawHistory = HistoryMapper.toPersistence(dish);

    try {
      if (exists) {
        await this.historyModel.update(rawHistory, {
          where: { id: dish.id },
        });
        return dish;
      }
      await this.historyModel.create(rawHistory);
      return dish;
    } catch (error) {
      throw new Error('Saving operation failed.');
    }
  }
}
