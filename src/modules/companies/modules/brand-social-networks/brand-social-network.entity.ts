import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  BeforeCreate,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { switchOperation } from 'src/core/helpers/operations.helper';
import { TEntityOperation } from 'src/core/types';
import { BrandEntity } from '../brand/brand.entity';
import { SocialNetworkEntity } from '../social-networks/social-network.entity';

@Table({
  tableName: 'brand_social_networks',
})
export class BrandSocialNetworkEntity extends Model<BrandSocialNetworkEntity> {
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
  user: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      max: 3,
    },
  })
  countryCode: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo: string;

  @Exclude()
  @ForeignKey(() => BrandEntity)
  @Column({
    type: DataType.BIGINT,
  })
  brandId: number;

  @Exclude()
  @ForeignKey(() => SocialNetworkEntity)
  @Column({
    type: DataType.BIGINT,
  })
  socialNetworkId: number;

  @Expose()
  @Type(() => BrandEntity)
  @HasMany(() => BrandEntity, {
    sourceKey: 'id',
    foreignKey: 'id',
    as: 'brand',
  })
  brand: BrandEntity;

  @Expose()
  @Type(() => SocialNetworkEntity)
  @HasMany(() => SocialNetworkEntity, {
    sourceKey: 'id',
    foreignKey: 'id',
    as: 'socialNetwork',
  })
  socialNetwork: SocialNetworkEntity;

  @BeforeCreate
  static async setDefaultId(entity: BrandSocialNetworkEntity) {
    const idNumber = await getNextId(
      entity.sequelize,
      'brand_social_networks_sequence'
    );

    entity.id = idNumber;
  }
  declare switchOperation: (request: TEntityOperation) => void;
}

BrandSocialNetworkEntity.prototype.switchOperation = switchOperation;
