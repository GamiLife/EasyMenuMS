import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  BelongsToMany,
  BeforeCreate,
  BelongsTo,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CompanyEntity } from 'src/modules/companies/company.entity';

import { DishModel } from '../../../dishes/infraestructure/db/dish.model';
import { ComboSauceModel } from './combo-sauces.model';
import { ComboDishesModel } from './combo-dishes.model';
import { SauceModel } from 'src/modules/sauces/sauces.entity';

@Exclude()
@Table({
  tableName: 'combos',
  comment: 'Combos for dishes to apply discount and custom prices',
})
export class CombosModel extends Model<CombosModel> {
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
  title: string;

  @Expose()
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Expose()
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment:
      'In case this field is not filled we need to valid against each secondary dish and sauce maxItems',
  })
  maxItems: number;

  @Expose()
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  dishId?: number;

  @Expose()
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  companyId: number;

  @Expose()
  @Type(() => CompanyEntity)
  @BelongsTo(() => CompanyEntity, {
    foreignKey: 'companyId',
    as: 'company',
  })
  company: CompanyEntity;

  @Expose()
  @Type(() => DishModel)
  @BelongsTo(() => DishModel, {
    foreignKey: 'dishId',
    as: 'dishCombo',
  })
  dishCombo: DishModel;

  @Expose()
  @Type(() => DishModel)
  @BelongsToMany(() => DishModel, {
    through: { model: () => ComboDishesModel },
    as: 'dishesFromCombo',
  })
  dishesFromCombo: DishModel[];

  @Expose()
  @Type(() => SauceModel)
  @BelongsToMany(() => SauceModel, {
    through: { model: () => ComboSauceModel },
    as: 'saucesFromCombo',
  })
  saucesFromCombo: SauceModel[];

  @BeforeCreate
  static async setDefaultId(entity: CombosModel) {
    const idNumber = await getNextId(entity.sequelize, 'combos_sequence');

    entity.id = idNumber;
  }
}
