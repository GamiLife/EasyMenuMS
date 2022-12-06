import { Expose, Transform, Type } from '@nestjs/class-transformer';
import { IsString, IsNumber } from 'class-validator';

import { CompanyDomainV2 } from '../companies/company.domain';
import { UserTypeDomainV2 } from '../user-types/user-type.domain';

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
