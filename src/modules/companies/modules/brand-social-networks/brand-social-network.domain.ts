import { Expose } from '@nestjs/class-transformer';

export class BrandSocialDetailsDomain {
  @Expose()
  readonly id?: number;
  @Expose()
  readonly user: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly countryCode: string;
  @Expose()
  readonly socialNetworkId: number;
}
