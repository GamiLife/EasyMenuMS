import { CompanyResponseDto } from '../companies/company.dto';
import { UserTypeResponseDto } from '../user-types/user-type.dto';

export class UserCreateDto {
  readonly names: string;
  readonly lastnames: string;
  readonly email: string;
  readonly phone: string;
  readonly userTypeId: number;
  readonly companyId: number;
}

export class UserUpdateDto {
  readonly names: string;
  readonly lastnames: string;
  readonly email: string;
  readonly phone: string;
  readonly userTypeId: number;
  readonly companyId: number;
}

export class UserResponseDto {
  readonly id: number;
  readonly names: string;
  readonly lastnames: string;
  readonly email: string;
  readonly phone: string;
  readonly userType: UserTypeResponseDto;
  readonly company: CompanyResponseDto;
}
