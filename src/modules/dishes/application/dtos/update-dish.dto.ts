export class UpdateDishRequestDTO {
  title: string;
  description: string;
  priceByUnit: number;
  maxItems: number;
}

export class UpdateDishResponseDTO {
  id: number;
  title: string;
  description: string;
}
