import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  PrimaryKey,
  BeforeCreate,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { DishEntity } from './dishes.entity';

@Exclude()
@Table({
  tableName: 'dishes_dishes',
})
export class DishDishesEntity extends Model<DishDishesEntity> {
  @Expose()
  @PrimaryKey
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

  @BeforeCreate
  static async setDefaultId(entity: DishDishesEntity) {
    const idNumber = await getNextId(
      entity.sequelize,
      'dishes_sauces_sequence'
    );

    entity.id = idNumber;
  }
}
