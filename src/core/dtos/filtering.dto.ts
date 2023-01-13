import { Expose } from '@nestjs/class-transformer';
import { Transform } from 'class-transformer';

/**
 *  Filtering Request
 */
export class FilteringPayload<T> {
  @Expose()
  search: string;
  @Expose()
  @Transform(({ value }) => {
    try {
      const parseOrderValues = JSON.parse(`[${value}]`);
      return parseOrderValues;
    } catch (error) {
      const isArray = Array.isArray(value);
      return isArray ? value : [];
    }
  })
  sort?: Array<[string, 'ASC' | 'DESC']>;
}

export interface IFilterDto {
  search: string;
}

export class FilterDto {
  @Expose()
  search: string;

  constructor({ search }: IFilterDto) {
    this.search = search;
  }
}
