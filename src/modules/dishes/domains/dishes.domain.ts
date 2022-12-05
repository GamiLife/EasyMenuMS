import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsString, MaxLength, IsNumber } from 'class-validator';

import { AggregateRoot } from 'src/core/domain';
import {
  CategoryDomain,
  CategoryDomainV2,
} from '../../categories/categories.domain';
import { CompanyDomain, CompanyDomainV2 } from '../../companies/company.domain';

export interface IDishProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: CategoryDomain;
  company: CompanyDomain;
}

/**
 * Dish Domain
 */
export class DishDomainV2 {
  @Expose()
  @IsNumber()
  id?: number;
  @Expose()
  @IsString()
  title: string;
  @Expose()
  @IsString()
  description: string;
  @Expose()
  @IsString()
  price: number;
  @Expose()
  @IsString()
  imageUrl: string;
  @Expose()
  @Transform(({ value, obj }) => {
    if (!value) {
      return { id: obj?.categoryId };
    }
    return obj.category;
  })
  @Type(() => CategoryDomainV2)
  category: CategoryDomainV2;
  @Expose()
  @Transform(({ value, obj }) => {
    if (!value) {
      return { id: obj?.companyId };
    }
    return obj.company;
  })
  @Type(() => CompanyDomainV2)
  company: CompanyDomainV2;
}

export class DishDomain extends AggregateRoot<IDishProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get price() {
    return this.props.price;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get category() {
    return this.props.category;
  }

  get company() {
    return this.props.company;
  }
}
