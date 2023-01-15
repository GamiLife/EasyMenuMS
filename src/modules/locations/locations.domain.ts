import { Expose } from '@nestjs/class-transformer';

/**
 * LocationDomainDto
 */
export class LocationDomain {
  @Expose()
  readonly id: number;
  @Expose()
  readonly name: string;
  @Expose()
  readonly address: string;
  @Expose()
  readonly phone: string;
  @Expose()
  readonly companyId: number;
}
