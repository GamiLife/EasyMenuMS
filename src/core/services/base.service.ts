import { HttpStatus, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { PaginationPayload } from '../dtos';
import { DBError, EmptyError } from '../exceptions';

interface IServicePagination<T> {
  pagination: PaginationPayload;
  filtersRepo: FindOptions<T>['include'];
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

  async pagination<T>({
    pagination: { page, sizeByPage },
    filtersRepo,
  }: IServicePagination<T>): Promise<T> {
    const entities = await this.repository.findAll({
      include: filtersRepo,

      limit: sizeByPage,
      offset: (page - 1) * sizeByPage,
    });

    return entities;
  }
}
