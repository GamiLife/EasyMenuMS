import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  BelongsToMany,
  BeforeCreate,
  PrimaryKey,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { slugify } from 'src/core/helpers/slugify.helper';
import { CombosEntity } from 'src/modules/combos/combos.entity';
import { SauceEntity } from 'src/modules/sauces/sauces.entity';
import { CategoryEntity } from '../../categories/categories.entity';
import { CompanyEntity } from '../../companies/company.entity';
import { DishDishesEntity } from './dishes-dishes.entity';
import { DishSauceEntity } from './dishes-sauces.entity';

@Exclude()
@Table({
  tableName: 'dishes',
})
export class DishEntity extends Model<DishEntity> {
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
  title: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  slug: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Expose()
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  price: number;

  @Expose()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxItems: number;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl: string;

  @Expose()
  @Column({
    type: DataType.BIGINT,
  })
  categoryId: number;

  @Expose()
  @Column({
    type: DataType.BIGINT,
  })
  companyId: number;

  @Expose()
  @Type(() => CategoryEntity)
  @HasOne(() => CategoryEntity, {
    sourceKey: 'categoryId',
    foreignKey: 'id',
    as: 'category',
  })
  category: CategoryEntity;

  @Expose()
  @Type(() => CompanyEntity)
  @HasOne(() => CompanyEntity, {
    sourceKey: 'companyId',
    foreignKey: 'id',
    as: 'company',
  })
  company: CompanyEntity;

  @Expose()
  @Type(() => SauceEntity)
  @BelongsToMany(() => SauceEntity, {
    through: { model: () => DishSauceEntity },
    as: 'dishWithSauces',
  })
  dishWithSauces?: SauceEntity[];

  @Expose()
  @Type(() => CombosEntity)
  @BelongsToMany(() => CombosEntity, {
    through: { model: () => DishSauceEntity },
    as: 'dishSauceWithCombos',
  })
  dishSauceWithCombos?: CombosEntity[];

  @Expose()
  @Type(() => CombosEntity)
  @BelongsToMany(() => CombosEntity, {
    through: { model: () => DishDishesEntity },
    as: 'dishDishWithCombos',
  })
  dishDishWithCombos?: CombosEntity[];

  @Expose()
  @Type(() => DishEntity)
  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishDishesEntity },
    as: 'primaryDish',
  })
  primaryDish?: DishEntity;

  @Expose()
  @Type(() => DishEntity)
  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishDishesEntity },
    as: 'secondaryDish',
  })
  secondaryDish?: DishEntity;

  @BeforeCreate
  static async setDefaultId(entity: DishEntity) {
    const idNumber = await getNextId(entity.sequelize, 'dishes_sequence');

    entity.id = idNumber;
  }

  @BeforeCreate
  static slugFieldBeforeCreate(dish: DishEntity) {
    if (dish.dataValues.title) {
      dish.dataValues.slug = slugify(dish.dataValues.title);
    }
  }
}
