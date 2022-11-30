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

@Table({
  tableName: 'dishes',
})
export class DishEntity extends Model<DishEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl: string;

  @Column({
    type: DataType.BIGINT,
  })
  categoryId: number;

  @Column({
    type: DataType.BIGINT,
  })
  companyId: number;

  @HasOne(() => CategoryEntity, {
    sourceKey: 'categoryId',
    foreignKey: 'id',
    as: 'category',
  })
  category: CategoryEntity;

  @HasOne(() => CompanyEntity, {
    sourceKey: 'companyId',
    foreignKey: 'id',
    as: 'company',
  })
  company: CompanyEntity;

  @BelongsToMany(() => SauceEntity, {
    through: { model: () => DishSauceEntity },
  })
  sauces?: SauceEntity[];

  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishDishesEntity },
    as: 'dish',
  })
  dishesMain?: DishEntity[];

  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishDishesEntity },
    as: 'dishSecond',
  })
  dishesSecond?: DishEntity[];
}
