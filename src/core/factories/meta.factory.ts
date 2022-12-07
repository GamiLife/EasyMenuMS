import { MetaDomain } from '../domain';
import { PaginationDto, PaginationPayload } from '../dtos';
import { MetaDto } from '../dtos/meta.dto';

export interface IMetaFactory<T> {
  pagination: PaginationPayload;
  totalItems: number;
  data: T;
}

export class MetaFactory {
  static create<T>({ pagination, totalItems, data }: IMetaFactory<T>) {
    const metaPagination = new PaginationDto({
      page: pagination.page,
      totalItems,
      sizeByPage: pagination.sizeByPage,
    });
    const metadata = new MetaDto({ pagination: metaPagination });
    const metaResponse = new MetaDomain<T>({
      data,
      metadata,
    });

    return metaResponse;
  }
}
