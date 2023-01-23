import { Expose, Type } from '@nestjs/class-transformer';
import {
  BeforeCreate,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { BrandSocialNetworkEntity } from '../brand-social-networks/brand-social-network.entity';
import { BrandEntity } from '../brand/brand.entity';

@Table({
  tableName: 'social_networks',
})
export class SocialNetworkEntity extends Model<SocialNetworkEntity> {
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
  name: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Expose()
  @Type(() => BrandEntity)
  @BelongsToMany(() => BrandEntity, {
    through: { model: () => BrandSocialNetworkEntity },
  })
  brands?: BrandEntity[];

  @BeforeCreate
  static async setDefaultId(entity: SocialNetworkEntity) {
    const idNumber = await getNextId(entity.sequelize, 'companies_sequence');

    entity.id = idNumber;
  }
}
