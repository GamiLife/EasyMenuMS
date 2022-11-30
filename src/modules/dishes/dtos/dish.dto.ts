import { CategoryResponseDto } from 'src/modules/categories/categories.dto';
import { CompanyResponseDto } from 'src/modules/companies/company.dto';

export class DishCreateDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly imageUrl: string;
  readonly categoryId: number;
  readonly companyId: number;
}

export class DishUpdateDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly imageUrl: string;
  readonly categoryId: number;
  readonly companyId: number;
}

export class DishResponseDto {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly imageUrl: string;
  readonly category: CategoryResponseDto;
  readonly company: CompanyResponseDto;
}
