export class CreateDishRequestDTO {
  title: string;
  description: string;
  priceByUnit: number;
  maxItems: number;
}

export class CreateDishResponseDTO {
  id: number;
  title: string;
  description: string;
}
