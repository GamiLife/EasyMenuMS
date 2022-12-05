import { Exclude, Expose, Type } from '@nestjs/class-transformer';
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

@Exclude()
@Table({
  tableName: 'dishes_dishes',
})
export class DishDishesEntity extends Model<DishDishesEntity> {
  @Expose()
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Expose()
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  price: number;

  @Expose()
  @ForeignKey(() => DishEntity)
  @Column({
    type: DataType.BIGINT,
  })
  dishId: number;

  @Expose()
  @ForeignKey(() => DishEntity)
  @Column({
    type: DataType.BIGINT,
  })
  dishSecondId: number;

  @Expose()
  @Type(() => DishEntity)
  @HasMany(() => DishEntity, {
    sourceKey: 'dishId',
    foreignKey: 'id',
    as: 'dish',
  })
  dish: DishEntity;

  @Expose()
  @Type(() => DishEntity)
  @HasMany(() => DishEntity, {
    sourceKey: 'dishSecondId',
    foreignKey: 'id',
    as: 'dishSecond',
  })
  dishSecond: DishEntity;
}
