import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { CompanyDomainV2 } from '../companies/company.domain';

export class SauceDomainV2 {
  @Expose()
  id: number;
  @Expose()
  @IsString()
  title: string;
  @Expose()
  @IsString()
  description: string;
  @Expose()
  @IsNumber()
  price: number;
  @Expose()
  @IsString()
  imageUrl: string;
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
