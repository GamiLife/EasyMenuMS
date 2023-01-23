import { Expose, Transform } from '@nestjs/class-transformer';

export class BrandSocialDetailsDomain {
  @Expose()
  readonly user: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly countryCode: string;
}

export class SocialNetworkDomain {
  @Expose()
  readonly id: number;
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
  readonly details: BrandSocialDetailsDomain;
}
