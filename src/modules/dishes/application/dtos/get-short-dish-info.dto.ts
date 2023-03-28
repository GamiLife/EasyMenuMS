export class GetShortInfoRequestDTO {
  companyId: number;
}

export class GetShortInfoResponseDTO {
  id: number;
  title: string;
  description: string;
  slug: string;
  priceByUnit: number;
  maxItems: number;
  imageUrl: string;
}
