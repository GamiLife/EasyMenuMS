import { CompanyResponseDto } from '../companies/company.dto';

export class SauceCreateDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly imageUrl: string;
  readonly companyId: number;
}

export class SauceUpdateDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly imageUrl: string;
  readonly companyId: number;
}

export class SauceResponseDto {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly imageUrl: string;
  readonly company: CompanyResponseDto;
}
