import { Expose } from '@nestjs/class-transformer';
import { MetaDto } from '../dtos/meta.dto';

interface IMetaDomain<T> {
  data: T;
  metadata?: MetaDto;
}

export class MetaDomain<T> {
  @Expose()
  readonly data: T;
  @Expose()
  readonly metadata?: MetaDto;

  constructor({ data, metadata }: IMetaDomain<T>) {
    this.data = data;
    this.metadata = metadata;
  }
}
