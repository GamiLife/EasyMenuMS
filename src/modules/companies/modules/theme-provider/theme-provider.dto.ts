import {
  EThemeModeType,
  EThemeProviderType,
} from '@gamilife/node-components.core.core';
import { Expose } from '@nestjs/class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TOperations } from 'src/core/types';

export class ThemeProviderCreateDto {
  @Expose()
  @IsNotEmpty()
  readonly themeMode: EThemeModeType;
  @Expose()
  @IsNotEmpty()
  readonly type: EThemeProviderType;
  @Expose()
  @IsNotEmpty()
  readonly value: string;
}

export class ThemeProviderUpdateDto {
  @Expose()
  readonly id?: number;
  @Expose()
  @IsNotEmpty()
  readonly themeMode: EThemeModeType;
  @Expose()
  @IsNotEmpty()
  readonly type: EThemeProviderType;
  @Expose()
  @IsNotEmpty()
  readonly value: string;
  @Expose()
  @IsNotEmpty()
  readonly operation: TOperations;
}
