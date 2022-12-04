import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { AggregateRoot } from 'src/core/domain';
import { CompanyDomain, CompanyDomainV2 } from '../companies/company.domain';

export interface ISauceProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  company: CompanyDomain;
}

export class SauceDomainV2 {
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

export class SauceDomain extends AggregateRoot<ISauceProps> {
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

  get company() {
    return this.props.company;
  }
}
