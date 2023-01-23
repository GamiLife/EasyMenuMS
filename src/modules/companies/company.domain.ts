import { Expose } from '@nestjs/class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

/**
 * Company Domain
 */
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
  @Expose()
  @IsString()
  slugUrl: string;
}
