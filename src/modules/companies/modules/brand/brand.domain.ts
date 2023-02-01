import { Expose } from '@nestjs/class-transformer';

export class BrandDomain {
  @Expose()
  readonly id?: number;
  @Expose()
  readonly metaTitle: string;
  @Expose()
  readonly metaDescription: string;
}
