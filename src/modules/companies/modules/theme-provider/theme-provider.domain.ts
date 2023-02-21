import {
  EThemeModeType,
  EThemeProviderType,
} from '@gamilife/node-components.core.core';
import { Expose } from '@nestjs/class-transformer';

export class ThemeProviderDomain {
  @Expose()
  readonly id?: number;
  @Expose()
  readonly themeMode: EThemeModeType;
  @Expose()
  readonly type: EThemeProviderType;
  @Expose()
  readonly value: string;
}
