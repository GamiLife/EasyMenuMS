import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { DishEntity } from './dishes.entity';

@Table({
  tableName: 'dishes_dishes',
})
export class DishDishesEntity extends Model<DishDishesEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  price: number;

  @ForeignKey(() => DishEntity)
  @Column({
    type: DataType.BIGINT,
  })
  dishId: number;

  @ForeignKey(() => DishEntity)
  @Column({
    type: DataType.BIGINT,
  })
  dishSecondId: number;

  @HasMany(() => DishEntity, {
    sourceKey: 'dishId',
    foreignKey: 'id',
    as: 'dish',
  })
  dish: DishEntity;

  @HasMany(() => DishEntity, {
    sourceKey: 'dishSecondId',
    foreignKey: 'id',
    as: 'dishSecond',
  })
  dishSecond: DishEntity;
}
