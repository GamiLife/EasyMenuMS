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
import { CombosEntity } from '../combos.entity';
import { DishModel } from '../../dishes/infraestructure/db/dish.model';

@Exclude()
@Table({
  tableName: 'combo_dishes',
})
export class ComboDishesEntity extends Model<ComboDishesEntity> {
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
  priceByUnit: number;

  @Exclude()
  @ForeignKey(() => CombosEntity)
  @Column({
    type: DataType.BIGINT,
    comment: 'Combo assigned',
  })
  comboId: number;

  @Expose()
  @ForeignKey(() => DishModel)
  @Column({
    type: DataType.BIGINT,
  })
  secondarydishId: number;

  @Exclude()
  @Column({
    type: DataType.BIGINT,
    comment: 'Max Secondary dishes available',
  })
  maxItemsByRow: number;

  @Expose()
  @Type(() => CombosEntity)
  @HasMany(() => CombosEntity, {
    sourceKey: 'comboId',
    foreignKey: 'id',
    as: 'comboDish',
  })
  comboDish: CombosEntity;

  @Expose()
  @Type(() => DishModel)
  @HasMany(() => DishModel, {
    sourceKey: 'secondarydishId',
    foreignKey: 'id',
    as: 'secondaryDish',
  })
  secondaryDish: DishModel;

  @BeforeCreate
  static async setDefaultId(entity: ComboDishesEntity) {
    const idNumber = await getNextId(entity.sequelize, 'combo_dishes_sequence');

    entity.id = idNumber;
  }
}
