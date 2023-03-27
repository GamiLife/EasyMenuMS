import { HttpStatus } from '@nestjs/common';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { FindOptions } from 'sequelize';
import { FilteringPayload, PaginationPayload } from 'src/core/dtos';
import { DBError, EmptyError } from 'src/core/exceptions';

interface IRepositoryPagination<T, S> {
  attributes?: any[];
  where?: Record<string, any>;
  sort?: Array<[string, 'ASC' | 'DESC']>;
  query?: FindOptions<T>['include'];
  pagination: PaginationPayload<S>;
}

interface IRepositoryCount<T> {
  searchBy?: FilteringPayload['searchBy'];
  searchOp?: FilteringPayload['searchOp'];
  query?: FindOptions<T>['include'];
  where?: Record<string, any>;
}

export class PaginationRepository<E = any> {
  private readonly repository: any;

  constructor(repository: E) {
    this.repository = repository;
  }

  private chainningSearch(
    searchBy: FilteringPayload['searchBy'],
    searchOp: FilteringPayload['searchOp']
  ) {
    if (!searchBy.length) return {};
    if (!searchOp) return {};

    return {
      [Op[searchOp.toLowerCase()]]: searchBy.map(([term, value]) =>
        sequelize.where(sequelize.fn('LOWER', sequelize.col(term)), {
          [Op.like]: `%${value.toLowerCase()}%`,
        })
      ),
    };
  }

  async count<T>({
    query = [],
    where,
    searchBy,
    searchOp,
  }: IRepositoryCount<T>) {
    let filters: Record<string, any> = {
      include: query,
    };

    if (searchBy) {
      filters = {
        ...filters,
        where: this.chainningSearch(searchBy, searchOp),
      };
    }

    if (where) {
      filters = {
        ...filters,
        where: {
          ...filters.where,
          ...where,
        },
      };
    }

    const lenght = await this.repository.count(filters).catch((reason) => {
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
    attributes,
    pagination: { page, sizeByPage, searchBy, searchOp },
    query,
    where,
    sort,
  }: IRepositoryPagination<T, S>): Promise<T> {
    let filters: Record<string, any> = {
      attributes,
      include: query,
    };

    if (sizeByPage && page) {
      filters = {
        ...filters,
        limit: sizeByPage,
        offset: (page - 1) * sizeByPage,
      };
    }

    if (searchBy) {
      filters = {
        ...filters,
        where: this.chainningSearch(searchBy, searchOp),
      };
    }

    if (where) {
      filters = {
        ...filters,
        where: {
          ...filters.where,
          ...where,
        },
      };
    }

    if (sort?.length) {
      filters = {
        ...filters,
        order: sort,
      };
    }

    const entities = await this.repository.findAll(filters);

    return entities;
  }
}
