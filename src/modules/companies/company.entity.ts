import { Expose, Type, Exclude } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  PrimaryKey,
  BeforeCreate,
  Unique,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CategoryEntity } from '../categories/categories.entity';
import { DishEntity } from '../dishes/entities/dishes.entity';
import { LocationsEntity } from '../locations/locations.entity';
import { NewEntity } from '../news/news.entity';
import { SauceEntity } from '../sauces/sauces.entity';
import { UserEntity } from '../users/users.entity';
import { StaticPagesEntity } from '../static-pages/static-pages.entity';
import { BrandEntity } from './modules/brand/brand.entity';
import { CombosEntity } from '../combos/combos.entity';

@Exclude()
@Table({
  tableName: 'companies',
})
export class CompanyEntity extends Model<CompanyEntity> {
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
  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      max: 100,
      isLowercase: true,
      is: /^([a-z]|[0-9]|(-))+$/i,
    },
  })
  slugUrl: string;

  @Expose()
  @Type(() => BrandEntity)
  @HasOne(() => BrandEntity, {
    as: 'brand',
  })
  brand: BrandEntity;

  @Expose()
  @Type(() => StaticPagesEntity)
  @HasMany(() => StaticPagesEntity, {
    as: 'staticPages',
  })
  staticPages: StaticPagesEntity[];

  @Expose()
  @Type(() => CategoryEntity)
  @BelongsTo(() => CategoryEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'category',
  })
  category: CategoryEntity;

  @Expose()
  @Type(() => UserEntity)
  @BelongsTo(() => UserEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'user',
  })
  user: UserEntity;

  @Expose()
  @Type(() => NewEntity)
  @BelongsTo(() => NewEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'new',
  })
  new: NewEntity;

  @Expose()
  @Type(() => LocationsEntity)
  @BelongsTo(() => LocationsEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'location',
  })
  location: LocationsEntity;

  @Expose()
  @Type(() => CombosEntity)
  @BelongsTo(() => CombosEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'combo',
  })
  combo: CombosEntity;

  @Expose()
  @Type(() => SauceEntity)
  @BelongsTo(() => SauceEntity, {
    targetKey: 'id',
    foreignKey: 'sauceId',
    as: 'sauce',
  })
  sauce: SauceEntity;

  @Expose()
  @Type(() => DishEntity)
  @BelongsTo(() => DishEntity, {
    targetKey: 'id',
    foreignKey: 'dishId',
    as: 'dish',
  })
  dish: DishEntity;

  @BeforeCreate
  static async setDefaultId(entity: CompanyEntity) {
    const idNumber = await getNextId(entity.sequelize, 'companies_sequence');

    entity.id = idNumber;
  }
}
