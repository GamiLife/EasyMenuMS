import { Expose, Transform } from '@nestjs/class-transformer';
import { BrandSocialDetailsDomain } from '../brand-social-networks/brand-social-network.domain';

export class SocialNetworkDomain {
  @Expose()
  readonly id?: number;
  @Expose()
  readonly name: string;
  @Expose()
  readonly description: string;
  @Expose()
  @Transform(({ obj }) => {
    return {
      user: obj?.details?.user,
      phone: obj?.details?.phone,
      countryCode: obj?.details?.countryCode,
    };
  })
  readonly details?: BrandSocialDetailsDomain;
}
