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

export enum ELogoType {
  primary = 'primary',
  secondary = 'secondary',
  thid = 'third',
  header = 'header',
  footer = 'footer',
  iconPage = 'icon-page',
}
const enumValues = getEnumKeys(ELogoType);

@Table({
  tableName: 'logos_provider',
})
export class LogoProviderEntity extends Model<LogoProviderEntity> {
  @Expose()
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  src: string;

  @Expose()
  @Column({
    defaultValue: ELogoType.primary,
    allowNull: false,
    validate: {
      customValidator: (value) => {
        if (!enumValues.includes(value)) {
          throw new Error('not a valid option');
        }
      },
    },
  })
  type: ELogoType;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  alt: string;

  @ForeignKey(() => BrandEntity)
  @Expose()
  @Column({
    type: DataType.BIGINT,
  })
  brandId: number;

  @Expose()
  @Type(() => BrandEntity)
  @BelongsTo(() => BrandEntity, {
    as: 'brand',
  })
  brand: BrandEntity;

  @BeforeCreate
  static async setDefaultId(entity: LogoProviderEntity) {
    const idNumber = await getNextId(
      entity.sequelize,
      'logos_provider_sequence'
    );

    entity.id = idNumber;
  }
}
