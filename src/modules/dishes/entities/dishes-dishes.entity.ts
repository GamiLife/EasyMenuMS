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
import { CombosEntity } from '../../combos/combos.entity';
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

  @Exclude()
  @ForeignKey(() => CombosEntity)
  @Column({
    type: DataType.BIGINT,
    comment: 'Combo assigned',
  })
  comboId: number;

  @Expose()
  @ForeignKey(() => DishEntity)
  @Column({
    type: DataType.BIGINT,
  })
  primaryDishId: number;

  @Expose()
  @ForeignKey(() => DishEntity)
  @Column({
    type: DataType.BIGINT,
  })
  secondarydishId: number;

  @Exclude()
  @Column({
    type: DataType.BIGINT,
    comment: 'Max Secondary dishes available',
  })
  maxSecondaryDishes: number;

  @Expose()
  @Type(() => CombosEntity)
  @HasMany(() => CombosEntity, {
    sourceKey: 'comboId',
    foreignKey: 'id',
    as: 'comboDishWithSecondDish',
  })
  comboDishWithSecondDish: CombosEntity;

  @Expose()
  @Type(() => DishEntity)
  @HasMany(() => DishEntity, {
    sourceKey: 'primaryDishId',
    foreignKey: 'id',
    as: 'primaryDish',
  })
  primaryDish: DishEntity;

  @Expose()
  @Type(() => DishEntity)
  @HasMany(() => DishEntity, {
    sourceKey: 'secondarydishId',
    foreignKey: 'id',
    as: 'secondaryDish',
  })
  secondaryDish: DishEntity;

  @BeforeCreate
  static async setDefaultId(entity: DishDishesEntity) {
    const idNumber = await getNextId(
      entity.sequelize,
      'dishes_sauces_sequence'
    );

    entity.id = idNumber;
  }
}
