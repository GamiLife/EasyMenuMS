import { Expose } from '@nestjs/class-transformer';
import { MetaDto } from '../dtos/meta.dto';

interface IMetaDomain<T> {
  data: T;
  metaData?: MetaDto;
}

export class MetaDomain<T> {
  @Expose()
  readonly data: T;
  @Expose()
  readonly metaData?: MetaDto;

  constructor({ data, metaData }: IMetaDomain<T>) {
    this.data = data;
    this.metaData = metaData;
  }
}
