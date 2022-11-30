import { CompanyResponseDto } from '../companies/company.dto';

export class CategoryCreateDto {
  readonly title: string;
  readonly description: string;
  readonly iconId: string;
  readonly companyId: number;
}

export class CategoryUpdateDto {
  readonly title: string;
  readonly description: string;
  readonly iconId: string;
  readonly companyId: number;
}

export class CategoryResponseDto {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
  readonly iconId: string;
  readonly company: CompanyResponseDto;
}
