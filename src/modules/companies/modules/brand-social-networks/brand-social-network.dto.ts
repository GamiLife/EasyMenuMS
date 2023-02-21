import { Expose } from '@nestjs/class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TOperations } from 'src/core/types';

export class BrandSocialNetworksCreateDto {
  @Expose()
  readonly user: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly countryCode: string;
  @Expose()
  readonly socialNetworkId: number;
}

export class BrandSocialNetworksUpdateDto {
  @Expose()
  readonly id?: number;
  @Expose()
  readonly user: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly countryCode: string;
  @Expose()
  @IsNotEmpty()
  readonly socialNetworkId: number;
  @Expose()
  @IsNotEmpty()
  readonly operation: TOperations;
}
