import { Expose } from '@nestjs/class-transformer';
import { IsString, MaxLength, IsNumber } from 'class-validator';

/**
 * Category Domain
 */
export class UserTypeDomainV2 {
  @Expose()
  @IsNumber()
  id: number;
  @Expose()
  @IsString()
  @MaxLength(150, { message: 'This name is not valid' })
  name: string;
  @Expose()
  @IsString()
  description: string;
}
