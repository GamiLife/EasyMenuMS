import { PaginationPayload } from 'src/core/dtos';

export class GetDishCollectionFilters {}

export class GetComboCollectionRequestDTO extends PaginationPayload<GetDishCollectionFilters> {
  companyId: number;
}

export class GetComboCollectionResponseDTO {
  id: number;
  title: string;
  description: string;
  maxItems: number;
}
