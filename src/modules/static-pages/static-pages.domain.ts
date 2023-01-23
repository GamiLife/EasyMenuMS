import { Expose, Type } from '@nestjs/class-transformer';
import { EPageType } from './static-pages.dto';

/**
 * StaticPagesDomain
 */
export class StaticPagesDomain {
  @Expose()
  readonly id: number;
  @Expose()
  readonly url: string;
  @Expose()
  readonly htmlContent: string;
  @Expose()
  readonly companyId: number;
  @Expose()
  readonly pageType: EPageType;
}
