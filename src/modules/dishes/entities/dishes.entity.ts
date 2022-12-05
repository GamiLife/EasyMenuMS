import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  AutoIncrement,
  PrimaryKey,
  BelongsToMany,
} from 'sequelize-typescript';
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
  @AutoIncrement
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
  })
  sauces?: SauceEntity[];

  @Expose()
  @Type(() => DishEntity)
  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishDishesEntity },
    as: 'dish',
  })
  dishesMain?: DishEntity[];

  @Expose()
  @Type(() => DishEntity)
  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishDishesEntity },
    as: 'dishSecond',
  })
  dishesSecond?: DishEntity[];
}
