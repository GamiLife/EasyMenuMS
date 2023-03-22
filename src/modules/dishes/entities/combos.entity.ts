import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { DishDishesEntity } from './dishes-dishes.entity';
import { DishSauceEntity } from './dishes-sauces.entity';
import { DishEntity } from './dishes.entity';

@Exclude()
@Table({
  tableName: 'combos',
  comment: 'Combos for dishes to apply discount and custom prices',
})
export class CombosEntity extends Model<CombosEntity> {
  @Expose()
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
  })
  id: number;
  @Expose()
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Expose()
  @Type(() => DishEntity)
  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishSauceEntity },
  })
  comboDishSauce?: DishEntity;

  @Expose()
  @Type(() => DishEntity)
  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishDishesEntity },
  })
  comboDishDish?: DishEntity;
}
