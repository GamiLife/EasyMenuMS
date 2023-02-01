import { Expose } from '@nestjs/class-transformer';

export class SocialNetworksCreateDto {
  @Expose()
  readonly name: string;
  @Expose()
  readonly description: string;
}

export class SocialNetworksUpdateDto {
  @Expose()
  readonly id: number;
  @Expose()
  readonly name: string;
  @Expose()
  readonly description: string;
}
