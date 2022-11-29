import { CompanyResponseDto } from '../companies/company.dto';

export class NewCreateDto {
  readonly title: string;
  readonly description: string;
  readonly imageUrl?: string;
  readonly backgroundColor?: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly companyId: number;
}

export class NewUpdateDto {
  readonly title: string;
  readonly description: string;
  readonly imageUrl?: string;
  readonly backgroundColor?: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly companyId: number;
}

export class NewResponseDto {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly imageUrl?: string;
  readonly backgroundColor?: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly company: CompanyResponseDto;
}
