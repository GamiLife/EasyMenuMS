import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsString, MaxLength, IsNumber } from 'class-validator';
import { AggregateRoot } from 'src/core/domain';
import { CompanyDomain, CompanyDomainV2 } from '../companies/company.domain';

export interface INewProps {
  title: string;
  description: string;
  imageUrl?: string;
  backgroundColor?: string;
  startDate: string;
  endDate: string;
  company: CompanyDomain;
}

/**
 * New Domain
 */
export class NewDomainV2 {
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
  imageUrl: string;
  @Expose()
  @IsString()
  backgroundColor: string;
  @Expose()
  @IsString()
  startDate: string;
  @Expose()
  @IsString()
  endDate: string;
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

export class NewDomain extends AggregateRoot<INewProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get backgroundColor() {
    return this.props.backgroundColor;
  }

  get startDate() {
    return this.props.startDate;
  }

  get endDate() {
    return this.props.endDate;
  }

  get company() {
    return this.props.company;
  }
}
