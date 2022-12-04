import { Expose, Type } from '@nestjs/class-transformer';
import {
  IsString,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsEmail,
} from 'class-validator';
import { CompanyResponseDto } from '../companies/company.dto';
import { UserTypeResponseDto } from '../user-types/user-type.dto';

/**
 * Request on create user
 */
export class UserCreateDto {
  @IsNotEmpty({ message: 'Names required' })
  @MinLength(2, { message: 'Min length of names is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'These names is not valid' })
  readonly names: string;
  @IsNotEmpty({ message: 'LastNames required' })
  @MinLength(2, { message: 'Min length of lastnames is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'These lastnames is not valid' })
  readonly lastnames: string;
  @IsNotEmpty({ message: 'Email required' })
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly phone: string;
  @IsNotEmpty({ message: 'UserTypeId required' })
  @IsNumber()
  readonly userTypeId: number;
  @IsNotEmpty({ message: 'CompanyId required' })
  @IsNumber()
  readonly companyId: number;
}

/**
 * Request on update user
 */
export class UserUpdateDto {
  @Expose()
  @IsNotEmpty({ message: 'Names required' })
  @MinLength(2, { message: 'Min length of names is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'These names is not valid' })
  readonly names: string;
  @Expose()
  @IsNotEmpty({ message: 'LastNames required' })
  @MinLength(2, { message: 'Min length of lastnames is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'These lastnames is not valid' })
  readonly lastnames: string;
  @Expose()
  @IsNotEmpty({ message: 'Email required' })
  @IsString()
  @IsEmail()
  readonly email: string;
  @Expose()
  @IsString()
  readonly phone: string;
  @Expose()
  @IsNotEmpty({ message: 'UserTypeId required' })
  @IsNumber()
  readonly userTypeId: number;
  @Expose()
  @IsNotEmpty({ message: 'CompanyId required' })
  @IsNumber()
  readonly companyId: number;
}

/**
 * UserDto
 */
export class UserResponseDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsString()
  readonly names: string;
  @Expose()
  @IsString()
  readonly lastnames: string;
  @Expose()
  @IsString()
  readonly email: string;
  @Expose()
  @IsString()
  readonly phone: string;
  @Expose()
  @Type(() => UserTypeResponseDto)
  readonly userType: UserTypeResponseDto;
  @Expose()
  @Type(() => CompanyResponseDto)
  readonly company: CompanyResponseDto;
}
