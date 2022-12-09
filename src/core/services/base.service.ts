import { HttpStatus } from '@nestjs/common';
import sequelize from 'sequelize';
import { FindOptions } from 'sequelize';
import { PaginationPayload } from '../dtos';
import { DBError, EmptyError } from '../exceptions';

interface IServicePagination<T, S> {
  pagination: PaginationPayload<S>;
  filtersRepo: FindOptions<T>['include'];
  searchCol: string;
}

interface IServiceCount<T> {
  filtersRepo: FindOptions<T>['include'];
}

export class BaseService<E = any> {
  readonly repository: any;

  constructor(repository: E) {
    this.repository = repository;
  }

  async count<T>({ filtersRepo }: IServiceCount<T>) {
    const lenght = await this.repository
      .count({
        include: filtersRepo,
      })
      .catch((reason) => {
        throw new DBError(
          `Query counter failed: ${reason}`,
          HttpStatus.BAD_REQUEST
        );
      });

    if (lenght < 0) {
      throw new EmptyError('Counter failed', HttpStatus.NOT_FOUND);
    }

    return lenght;
  }

  async pagination<T, S = any>({
    pagination: { page, sizeByPage, search },
    filtersRepo,
    searchCol,
  }: IServicePagination<T, S>): Promise<T> {
    let filters: Record<string, any> = {
      include: filtersRepo,
      limit: sizeByPage,
      offset: (page - 1) * sizeByPage,
    };

    if (search) {
      filters = {
        ...filters,
        where: {
          [searchCol]: sequelize.where(
            sequelize.fn('LOWER', sequelize.col(searchCol)),
            'LIKE',
            `${search.toLowerCase()}%`
          ),
        },
      };
    }

    const entities = await this.repository.findAll(filters);

    return entities;
  }
}
