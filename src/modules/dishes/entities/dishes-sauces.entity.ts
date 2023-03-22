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
import { CombosEntity } from './combos.entity';
import { DishEntity } from './dishes.entity';

@Exclude()
@Table({
  tableName: 'dishes_sauces',
  comment: `Table detail for sauces by dish, in this case we are going to find
            price detail and maxSauces to add in dish`,
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
    comment:
      'Sauce price for this dish, in this case if price is zero will be free',
  })
  price: number;

  @Exclude()
  @ForeignKey(() => DishEntity)
  @Column({
    type: DataType.BIGINT,
    comment: 'Dish joinned with sauces',
  })
  dishId: number;

  @Exclude()
  @ForeignKey(() => CombosEntity)
  @Column({
    type: DataType.BIGINT,
    comment: 'Combo assigned',
  })
  comboId: number;

  @Exclude()
  @ForeignKey(() => SauceEntity)
  @Column({
    type: DataType.BIGINT,
    comment: 'Sauce assigned with dish',
  })
  sauceId: number;

  @Exclude()
  @ForeignKey(() => SauceEntity)
  @Column({
    type: DataType.BIGINT,
    comment: 'Max sauces available to dish',
  })
  maxSauces: number;

  @Expose()
  @Type(() => SauceEntity)
  @HasMany(() => SauceEntity, {
    sourceKey: 'sauceId',
    foreignKey: 'id',
    as: 'sauce',
  })
  sauce: SauceEntity;

  @Expose()
  @Type(() => CombosEntity)
  @HasMany(() => CombosEntity, {
    sourceKey: 'comboId',
    foreignKey: 'id',
    as: 'combo',
  })
  combo: CombosEntity;

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
