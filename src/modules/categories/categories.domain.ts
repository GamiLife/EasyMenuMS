import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsString, MaxLength, IsNumber } from 'class-validator';
import { CompanyDomainV2 } from '../companies/company.domain';

/**
 * Category Domain
 */
export class CategoryDomainV2 {
  @Expose()
  @IsNumber()
  id: number;
  @Expose()
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
  title: string;
  @Expose()
  @IsString()
  description: string;
  @Expose()
  @IsString()
  iconId: string;
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
