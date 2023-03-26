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
import { CombosEntity } from '../../combos/combos.entity';

@Exclude()
@Table({
  tableName: 'combo_sauces',
  comment: `Table detail for sauces by dish, in this case we are going to find
            price detail and maxSauces to add in dish`,
})
export class ComboSauceEntity extends Model<ComboSauceEntity> {
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
  priceByUnit: number;

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
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'Max sauces available to dish',
  })
  maxItemsByRow: number;

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
    as: 'comboSauce',
  })
  comboSauce: CombosEntity;

  @BeforeCreate
  static async setDefaultId(entity: ComboSauceEntity) {
    const idNumber = await getNextId(entity.sequelize, 'combo_sauces_sequence');

    entity.id = idNumber;
  }
}
