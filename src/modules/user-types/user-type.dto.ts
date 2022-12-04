import { Expose } from '@nestjs/class-transformer';
import {
  IsString,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

/**
 * Request on create userType
 */
export class UserTypeCreateDto {
  @IsNotEmpty({ message: 'Name required' })
  @MinLength(2, { message: 'Min length of name is 2 characters' })
  @IsString()
  @MaxLength(150, { message: 'This name is not valid' })
  readonly name: string;
  @IsString()
  readonly description: string;
}

export class UserTypeUpdateDto {
  @Expose()
  @IsString()
  @MaxLength(150, { message: 'This name is not valid' })
  readonly name: string;
  @Expose()
  @IsString()
  readonly description: string;
}

export class UserTypeResponseDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsString()
  @MaxLength(150, { message: 'This name is not valid' })
  readonly name: string;
  @Expose()
  @IsString()
  readonly description: string;
}
