import { Expose } from '@nestjs/class-transformer';

/**
 *  Filtering Request
 */
export class FilteringPayload<T> {
  @Expose()
  search: string;
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
