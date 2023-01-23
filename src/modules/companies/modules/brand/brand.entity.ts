import { Expose } from '@nestjs/class-transformer';
import { Type } from 'class-transformer';
import {
  BeforeCreate,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CompanyEntity } from '../../company.entity';
import { BrandSocialNetworkEntity } from '../brand-social-networks/brand-social-network.entity';
import { LogoProviderEntity } from '../logo-provider/logo-provider.entity';
import { SocialNetworkEntity } from '../social-networks/social-network.entity';
import { ThemeProviderEntity } from '../theme-provider/theme-provider.entity';

@Table({
  tableName: 'brands',
})
export class BrandEntity extends Model<BrandEntity> {
  @Expose()
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Expose()
  @Column({
    allowNull: false,
    validate: {
      max: 300,
    },
  })
  metaTitle: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      max: 300,
    },
  })
  metaDescription: string;

  @Expose()
  @ForeignKey(() => CompanyEntity)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  companyId: number;

  @Expose()
  @Type(() => CompanyEntity)
  @BelongsTo(() => CompanyEntity, {
    as: 'company',
  })
  company: CompanyEntity;

  @Expose()
  @Type(() => ThemeProviderEntity)
  @HasMany(() => ThemeProviderEntity, {
    as: 'themeProviders',
  })
  themeProviders: ThemeProviderEntity[];

  @Expose()
  @Type(() => LogoProviderEntity)
  @HasMany(() => LogoProviderEntity, {
    as: 'logoProviders',
  })
  logoProviders: LogoProviderEntity[];

  @Expose()
  @Type(() => SocialNetworkEntity)
  @BelongsToMany(() => SocialNetworkEntity, {
    through: { model: () => BrandSocialNetworkEntity },
  })
  socialNetworks?: SocialNetworkEntity[];

  @BeforeCreate
  static async setDefaultId(entity: BrandEntity) {
    const idNumber = await getNextId(entity.sequelize, 'brands_sequence');

    entity.id = idNumber;
  }
}
