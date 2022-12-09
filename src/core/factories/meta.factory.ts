import { MetaDomain } from '../domain';
import { FilterDto, PaginationDto, PaginationPayload } from '../dtos';
import { MetaDto } from '../dtos/meta.dto';

export interface IMetaFactory<T, S> {
  pagination: PaginationPayload<S>;
  totalItems: number;
  data: T;
}

export class MetaFactory {
  static create<T>({ pagination, totalItems, data }: IMetaFactory<T, any>) {
    const metaPagination = new PaginationDto({
      page: pagination.page,
      totalItems,
      sizeByPage: pagination.sizeByPage,
    });
    const metaFilter = new FilterDto({
      search: pagination.search,
    });
    const metadata = new MetaDto({
      pagination: metaPagination,
      filters: metaFilter,
    });
    const metaResponse = new MetaDomain<T>({
      data,
      metadata,
    });

    return metaResponse;
  }
}
