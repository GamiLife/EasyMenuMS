import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsString, IsNumber } from 'class-validator';

import { AggregateRoot } from 'src/core/domain';
import { CompanyDomain, CompanyDomainV2 } from '../companies/company.domain';
import {
  UserTypeDomain,
  UserTypeDomainV2,
} from '../user-types/user-type.domain';

export interface IUserProps {
  names: string;
  lastnames: string;
  email: string;
  phone: string;

  userType: UserTypeDomain;
  company: CompanyDomain;
}

/**
 * User Domain
 */
export class UserDomainV2 {
  @Expose()
  @IsNumber()
  id: number;
  @Expose()
  @IsString()
  names: string;
  @Expose()
  @IsString()
  lastnames: string;
  @Expose()
  @IsString()
  email: string;
  @Expose()
  @IsString()
  phone: string;

  @Expose()
  @Transform(({ value, obj }) => {
    if (!value) {
      return { id: obj?.userTypeId };
    }
    return obj.userType;
  })
  @Type(() => UserTypeDomainV2)
  userType: UserTypeDomainV2;

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

export class UserDomain extends AggregateRoot<IUserProps> {
  get names() {
    return this.props.names;
  }

  get lastnames() {
    return this.props.lastnames;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.email;
  }

  get userType() {
    return this.props.userType;
  }

  get company() {
    return this.props.company;
  }
}
