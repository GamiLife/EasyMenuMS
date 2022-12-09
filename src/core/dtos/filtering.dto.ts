import { Expose } from '@nestjs/class-transformer';

/**
 *  Filtering Request
 */
export class FilteringPayload<T> {
  @Expose()
  search: string;
  @Expose()
  filter: T;
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
