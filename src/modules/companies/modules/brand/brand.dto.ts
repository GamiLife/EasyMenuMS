import { Expose } from '@nestjs/class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class BrandCreateDto {
  @Expose()
  @IsString()
  readonly metaTitle: string;
  @Expose()
  @IsString()
  readonly metaDescription: string;
}

export class BrandUpdateDto {
  @Expose()
  @IsNotEmpty()
  readonly id: number;
  @Expose()
  @IsString()
  readonly metaTitle: string;
  @Expose()
  @IsString()
  readonly metaDescription: string;
}
