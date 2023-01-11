import { HttpStatus } from "@nestjs/common";
import sequelize from "sequelize";
import { FindOptions } from "sequelize";
import { PaginationPayload } from "../dtos";
import { DBError, EmptyError } from "../exceptions";

interface IServicePagination<T, S> {
  attributes?: any[];
  pagination: PaginationPayload<S>;
  filtersRepo: FindOptions<T>["include"];
  searchCol: string;
  searchColFilters?: string;
  where?: Record<string, any>;
}

interface IServiceCount<T> {
  search?: string;
  filtersRepo: FindOptions<T>["include"];
  searchCol: string;
  searchColFilters?: string;
  where?: Record<string, any>;
}

export class BaseService<E = any> {
  readonly repository: any;

  constructor(repository: E) {
    this.repository = repository;
  }

  async count<T>({
    filtersRepo,
    where,
    searchCol,
    searchColFilters,
    search,
  }: IServiceCount<T>) {
    let filters: Record<string, any> = {
      include: filtersRepo,
    };

    if (search) {
      filters = {
        ...filters,
        where: {
          [searchCol]: sequelize.where(
            sequelize.fn("LOWER", sequelize.col(searchColFilters ?? searchCol)),
            "LIKE",
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
      throw new EmptyError("Counter failed", HttpStatus.NOT_FOUND);
    }

    return lenght;
  }

  async pagination<T, S = any>({
    attributes,
    pagination: { page, sizeByPage, search },
    filtersRepo,
    searchCol,
    searchColFilters,
    where,
  }: IServicePagination<T, S>): Promise<T> {
    let filters: Record<string, any> = {
      attributes,
      include: filtersRepo,
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
            sequelize.fn("LOWER", sequelize.col(searchColFilters ?? searchCol)),
            "LIKE",
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

    const entities = await this.repository.findAll(filters);

    return entities;
  }
}
