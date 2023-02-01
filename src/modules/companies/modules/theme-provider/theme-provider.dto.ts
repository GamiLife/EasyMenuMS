import { Expose } from '@nestjs/class-transformer';
import { EThemeModeType, EThemeProviderType } from './theme-provider.entity';

export class ThemeProviderCreateDto {
  @Expose()
  readonly themeMode: EThemeModeType;
  @Expose()
  readonly type: EThemeProviderType;
  @Expose()
  readonly value: string;
}

export class ThemeProviderUpdateDto {
  @Expose()
  readonly id?: number;
  @Expose()
  readonly themeMode: EThemeModeType;
  @Expose()
  readonly type: EThemeProviderType;
  @Expose()
  readonly value: string;
}
