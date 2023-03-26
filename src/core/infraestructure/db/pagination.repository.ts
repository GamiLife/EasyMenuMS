import { HttpStatus } from '@nestjs/common';
import sequelize from 'sequelize';
import { FindOptions } from 'sequelize';
import { PaginationPayload } from 'src/core/dtos';
import { DBError, EmptyError } from 'src/core/exceptions';

interface IRepositoryPagination<T, S> {
  attributes?: any[];
  pagination: PaginationPayload<S>;
  query: FindOptions<T>['include'];
  searchCol: string;
  searchColFilters?: string;
  where?: Record<string, any>;
  sort?: Array<[string, 'ASC' | 'DESC']>;
}

interface IRepositoryCount<T> {
  search?: string;
  query: FindOptions<T>['include'];
  searchCol: string;
  searchColFilters?: string;
  where?: Record<string, any>;
}

export class PaginationRepository<E = any> {
  private readonly repository: any;

  constructor(repository: E) {
    this.repository = repository;
  }

  async count<T>({
    query,
    where,
    searchCol,
    searchColFilters,
    search,
  }: IRepositoryCount<T>) {
    let filters: Record<string, any> = {
      include: query,
    };

    if (search) {
      filters = {
        ...filters,
        where: {
          [searchCol]: sequelize.where(
            sequelize.fn('LOWER', sequelize.col(searchColFilters ?? searchCol)),
            'LIKE',
            `${search.toLowerCase()}%`
          ),
        },
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
    pagination: { page, sizeByPage, search },
    query,
    searchCol,
    searchColFilters,
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

    if (search) {
      filters = {
        ...filters,
        where: {
          [searchCol]: sequelize.where(
            sequelize.fn('LOWER', sequelize.col(searchColFilters ?? searchCol)),
            'LIKE',
            `${search.toLowerCase()}%`
          ),
        },
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
