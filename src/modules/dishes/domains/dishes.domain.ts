import { Expose, Transform, Type } from "@nestjs/class-transformer";
import { IsString, IsNumber } from "class-validator";

import { CategoryDomainV2 } from "../../categories/categories.domain";
import { CompanyDomainV2 } from "../../companies/company.domain";

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
  slug: string;
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
