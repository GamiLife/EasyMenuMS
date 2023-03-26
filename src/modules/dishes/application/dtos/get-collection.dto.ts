import { PaginationPayload } from 'src/core/dtos';

export class GetDishCollectionFilters {}

export class GetDishCollectionRequestDTO extends PaginationPayload<GetDishCollectionFilters> {
  categoryId: number;
  companyId: number;
}

//TODO: Research better way to transform using class transformer with DDD
export class GetDishCollectionResponseDTO {
  id: number;
  title: string;
  description: string;
  priceByUnit: number;
  imageUrl: string;
  categoryId: number;
}
