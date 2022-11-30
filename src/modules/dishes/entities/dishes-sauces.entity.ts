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
import { SauceEntity } from '../../sauces/sauces.entity';
import { DishEntity } from './dishes.entity';

@Table({
  tableName: 'dishes_sauces',
})
export class DishSauceEntity extends Model<DishSauceEntity> {
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

  @ForeignKey(() => SauceEntity)
  @Column({
    type: DataType.BIGINT,
  })
  sauceId: number;

  @ForeignKey(() => DishEntity)
  @Column({
    type: DataType.BIGINT,
  })
  dishId: number;

  @HasMany(() => SauceEntity, {
    sourceKey: 'sauceId',
    foreignKey: 'id',
    as: 'sauce',
  })
  sauce: SauceEntity;

  @HasMany(() => DishEntity, {
    sourceKey: 'dishId',
    foreignKey: 'id',
    as: 'dish',
  })
  dish: DishEntity;
}
