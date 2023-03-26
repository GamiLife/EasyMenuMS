import { Expose, Type, Exclude } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  BeforeCreate,
  Unique,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CategoryEntity } from '../categories/categories.entity';
import { LocationsEntity } from '../locations/locations.entity';
import { NewEntity } from '../news/news.entity';
import { SauceEntity } from '../sauces/sauces.entity';
import { UserEntity } from '../users/users.entity';
import { StaticPagesEntity } from '../static-pages/static-pages.entity';
import { BrandEntity } from './modules/brand/brand.entity';
import { CombosEntity } from '../combos/combos.entity';
import { DishModel } from '../dishes/infraestructure/db/dish.model';

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
    foreignKey: 'companyId',
    as: 'brand',
  })
  brand: BrandEntity;

  @Expose()
  @Type(() => StaticPagesEntity)
  @HasMany(() => StaticPagesEntity, {
    foreignKey: 'companyId',
    as: 'staticPages',
  })
  staticPages: StaticPagesEntity[];

  @Expose()
  @Type(() => UserEntity)
  @HasMany(() => UserEntity, {
    foreignKey: 'companyId',
    as: 'user',
  })
  user: UserEntity[];

  @Expose()
  @Type(() => NewEntity)
  @HasMany(() => NewEntity, {
    foreignKey: 'companyId',
    as: 'new',
  })
  new: NewEntity[];

  @Expose()
  @Type(() => LocationsEntity)
  @HasMany(() => LocationsEntity, {
    foreignKey: 'companyId',
    as: 'location',
  })
  location: LocationsEntity[];

  @Expose()
  @Type(() => CategoryEntity)
  @HasMany(() => CategoryEntity, {
    foreignKey: 'companyId',
    as: 'category',
  })
  category: CategoryEntity[];

  @Expose()
  @Type(() => CombosEntity)
  @HasMany(() => CombosEntity, {
    foreignKey: 'companyId',
    as: 'combos',
  })
  combos: CombosEntity[];

  @Expose()
  @Type(() => SauceEntity)
  @HasMany(() => SauceEntity, {
    foreignKey: 'companyId',
    as: 'sauces',
  })
  sauces: SauceEntity[];

  @Expose()
  @Type(() => DishModel)
  @HasMany(() => DishModel, {
    foreignKey: 'companyId',
    as: 'dishes',
  })
  dishes: DishModel[];

  @BeforeCreate
  static async setDefaultId(entity: CompanyEntity) {
    const idNumber = await getNextId(entity.sequelize, 'companies_sequence');

    entity.id = idNumber;
  }
}
