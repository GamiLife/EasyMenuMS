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
import { UserEntity } from '../users/users.entity';
import { StaticPagesEntity } from '../static-pages/static-pages.entity';
import { BrandEntity } from './modules/brand/brand.entity';
import { DishModel } from '../dishes/infraestructure/db/dish.model';
import { CombosModel } from '../combos/infraestructure/db/combos.model';
import { SauceModel } from '../sauces/sauces.entity';

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
  @Type(() => CombosModel)
  @HasMany(() => CombosModel, {
    foreignKey: 'companyId',
    as: 'combos',
  })
  combos: CombosModel[];

  @Expose()
  @Type(() => SauceModel)
  @HasMany(() => SauceModel, {
    foreignKey: 'companyId',
    as: 'sauces',
  })
  sauces: SauceModel[];

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
