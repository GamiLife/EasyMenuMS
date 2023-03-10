import { EThemeModeType } from '@gamilife/node-components.core.core';
import { Expose } from '@nestjs/class-transformer';

export class ThemeProviderDomain {
  @Expose()
  readonly id?: number;
  @Expose()
  readonly themeMode: EThemeModeType;
  @Expose()
  readonly background: string;
  @Expose()
  readonly color: string;
  @Expose()
  readonly brandId: number;
  @Expose()
  readonly blockId: string;
}
