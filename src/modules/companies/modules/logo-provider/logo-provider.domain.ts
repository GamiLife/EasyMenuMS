import { Expose } from '@nestjs/class-transformer';
import { ELogoType } from './logo-provider.entity';

export class LogoProviderDomain {
  @Expose()
  readonly id: number;
  @Expose()
  readonly src: string;
  @Expose()
  readonly type: ELogoType;
  @Expose()
  readonly alt: string;
  @Expose()
  readonly brandId: number;
}
