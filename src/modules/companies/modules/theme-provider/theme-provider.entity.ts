import { Expose, Type } from '@nestjs/class-transformer';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { getEnumKeys, getNextId } from 'src/core/helpers';
import { BrandEntity } from '../brand/brand.entity';

export enum EThemeModeType {
  light = 'light',
  dark = 'dark',
}
export enum EThemeProviderType {
  primary = 'primary',
  secondary = 'secondary',
  thid = 'third',
}
const enumValuesThemeMode = getEnumKeys(EThemeModeType);
const enumValuesThemeProvider = getEnumKeys(EThemeProviderType);

@Table({
  tableName: 'theme_provider',
})
export class ThemeProviderEntity extends Model<ThemeProviderEntity> {
  @Expose()
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Expose()
  @Column({
    defaultValue: EThemeModeType.light,
    allowNull: false,
    validate: {
      customValidator: (value) => {
        if (!enumValuesThemeMode.includes(value)) {
          throw new Error('Theme mode not a valid option');
        }
      },
    },
  })
  themeMode: EThemeModeType;

  @Expose()
  @ForeignKey(() => BrandEntity)
  @Column({
    type: DataType.BIGINT,
  })
  brandId: number;

  @Expose()
  @Column({
    defaultValue: EThemeProviderType.primary,
    allowNull: false,
    validate: {
      customValidator: (value) => {
        if (!enumValuesThemeProvider.includes(value)) {
          throw new Error('Type not a valid option');
        }
      },
    },
  })
  type: EThemeProviderType;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @Expose()
  @Type(() => BrandEntity)
  @BelongsTo(() => BrandEntity, {
    as: 'brand',
  })
  brand: BrandEntity;

  @BeforeCreate
  static async setDefaultId(entity: ThemeProviderEntity) {
    const idNumber = await getNextId(
      entity.sequelize,
      'theme_provider_sequence'
    );

    entity.id = idNumber;
  }
}
