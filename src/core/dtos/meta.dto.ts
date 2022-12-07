import { Expose } from '@nestjs/class-transformer';
import { PaginationDto } from './pagination.dto';

interface IMetaDto {
  pagination?: PaginationDto;
}

export class MetaDto {
  @Expose()
  readonly pagination?: PaginationDto;

  constructor({ pagination }: IMetaDto) {
    if (pagination) this.pagination = pagination;
  }
}
