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
import { SauceEntity } from '../../sauces/sauces.entity';
import { DishEntity } from './dishes.entity';

@Exclude()
@Table({
  tableName: 'dishes_sauces',
})
export class DishSauceEntity extends Model<DishSauceEntity> {
  @Exclude()
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Exclude()
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  price: number;

  @Exclude()
  @ForeignKey(() => SauceEntity)
  @Column({
    type: DataType.BIGINT,
  })
  sauceId: number;

  @Exclude()
  @ForeignKey(() => DishEntity)
  @Column({
    type: DataType.BIGINT,
  })
  dishId: number;

  @Expose()
  @Type(() => SauceEntity)
  @HasMany(() => SauceEntity, {
    sourceKey: 'sauceId',
    foreignKey: 'id',
    as: 'sauce',
  })
  sauce: SauceEntity;

  @Expose()
  @Type(() => DishEntity)
  @HasMany(() => DishEntity, {
    sourceKey: 'dishId',
    foreignKey: 'id',
    as: 'dish',
  })
  dish: DishEntity;

  @BeforeCreate
  static async setDefaultId(entity: DishSauceEntity) {
    const idNumber = await getNextId(
      entity.sequelize,
      'dishes_sauces_sequence'
    );

    entity.id = idNumber;
  }
}
