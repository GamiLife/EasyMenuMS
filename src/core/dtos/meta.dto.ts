import { Expose } from '@nestjs/class-transformer';
import { FilterDto } from './filtering.dto';
import { PaginationDto } from './pagination.dto';

interface IMetaDto {
  pagination?: PaginationDto;
  filters?: FilterDto;
}

export class MetaDto {
  @Expose()
  readonly pagination?: PaginationDto;
  @Expose()
  readonly filters?: FilterDto;

  constructor({ pagination, filters }: IMetaDto) {
    if (pagination) this.pagination = pagination;
    if (filters) this.filters = filters;
  }
}
