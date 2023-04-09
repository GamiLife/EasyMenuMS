import { Exclude, Expose, Type } from '@nestjs/class-transformer';

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  BelongsToMany,
  BeforeCreate,
  BelongsTo,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CompanyEntity } from '../companies/company.entity';
import { CombosModel } from '../combos/infraestructure/db/combos.model';
import { ComboSauceModel } from '../combos/infraestructure/db/combo-sauces.model';

@Exclude()
@Table({
  tableName: 'sauces',
})
export class SauceModel extends Model<SauceModel> {
  @Expose()
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Expose()
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  priceByUnit: number;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl: string;

  @Expose()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxItems: number;

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
  @Type(() => CombosModel)
  @BelongsToMany(() => CombosModel, {
    through: { model: () => ComboSauceModel },
    as: 'comboSauce',
  })
  comboSauce?: CombosModel;

  @BeforeCreate
  static async setDefaultId(entity: SauceModel) {
    const idNumber = await getNextId(entity.sequelize, 'sauces_sequence');

    entity.id = idNumber;
  }
}
