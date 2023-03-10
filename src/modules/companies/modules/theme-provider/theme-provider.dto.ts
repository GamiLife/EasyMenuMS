import { EThemeModeType } from '@gamilife/node-components.core.core';
import { Expose } from '@nestjs/class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TOperations } from 'src/core/types';

export class ThemeProviderCreateDto {
  @Expose()
  @IsNotEmpty()
  readonly themeMode: EThemeModeType;
  @Expose()
  @IsNotEmpty()
  readonly background: string;
  @Expose()
  @IsNotEmpty()
  readonly color: string;
  @Expose()
  @IsNotEmpty()
  readonly brandId: number;
}

export class ThemeProviderUpdateDto {
  @Expose()
  readonly id?: number;
  @Expose()
  @IsNotEmpty()
  readonly themeMode: EThemeModeType;
  @Expose()
  @IsNotEmpty()
  readonly background: string;
  @Expose()
  @IsNotEmpty()
  readonly color: string;
  @Expose()
  @IsNotEmpty()
  readonly brandId: number;
}

export class ThemeProviderResponseDto {
  @Expose()
  readonly id?: number;
  @Expose()
  @IsNotEmpty()
  readonly themeMode: EThemeModeType;
  @Expose()
  @IsNotEmpty()
  readonly background: string;
  @Expose()
  @IsNotEmpty()
  readonly color: string;
  @Expose()
  @IsNotEmpty()
  readonly brandId: number;
  @Expose()
  readonly blockId: string;
}
