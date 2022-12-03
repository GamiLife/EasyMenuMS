import { Expose, Type } from '@nestjs/class-transformer';
import { IsString, MaxLength, IsNumber } from 'class-validator';
import { AggregateRoot } from 'src/core/domain';
import { CompanyDomain } from '../companies/company.domain';

export interface ICategoryProps {
  id?: number;
  title: string;
  description: string;
  iconId: string;
  company: CompanyDomain;
}

export class CompanyDomainV2 {
  @Expose()
  @IsNumber()
  id: number;
  @Expose()
  @IsString()
  @MaxLength(150, { message: 'This title is not valid' })
  name: string;
  @Expose()
  @IsString()
  description: string;
}

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
  @Type(() => CompanyDomainV2)
  company: CompanyDomainV2;
}

export class CategoryDomain extends AggregateRoot<ICategoryProps> {
  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get iconId() {
    return this.props.iconId;
  }

  get company() {
    return this.props.company;
  }
}
