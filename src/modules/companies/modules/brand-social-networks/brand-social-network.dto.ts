import { Expose } from '@nestjs/class-transformer';

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
  readonly id: number;
  @Expose()
  readonly user: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly countryCode: string;
  @Expose()
  readonly socialNetworkId: number;
}
