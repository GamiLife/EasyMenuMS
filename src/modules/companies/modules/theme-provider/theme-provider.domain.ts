import { Expose } from '@nestjs/class-transformer';
import { EThemeModeType, EThemeProviderType } from './theme-provider.entity';

export class ThemeProviderDomain {
  @Expose()
  readonly id: number;
  @Expose()
  readonly themeMode: EThemeModeType;
  @Expose()
  readonly brandId: number;
  @Expose()
  readonly type: EThemeProviderType;
  @Expose()
  readonly value: string;
}
