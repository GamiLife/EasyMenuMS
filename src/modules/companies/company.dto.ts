import { Expose } from '@nestjs/class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CompanyCreateDto {
  readonly name: string;
  readonly description: string;
}

export class CompanyUpdateDto {
  readonly name: string;
  readonly description: string;
}

export class CompanyResponseDto {
  @Expose()
  @IsNumber()
  readonly id?: number;
  @Expose()
  @IsString()
  readonly name: string;
  @Expose()
  @IsString()
  readonly description: string;
}
