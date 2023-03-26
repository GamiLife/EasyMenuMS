import { Exclude, Expose, Type } from '@nestjs/class-transformer';

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasOne,
  BelongsToMany,
  BeforeCreate,
  BelongsTo,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CombosEntity } from '../combos/combos.entity';
import { CompanyEntity } from '../companies/company.entity';
import { ComboSauceEntity } from '../dishes/entities/combo-sauces.entity';

@Exclude()
@Table({
  tableName: 'sauces',
})
export class SauceEntity extends Model<SauceEntity> {
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
  @Type(() => CombosEntity)
  @BelongsToMany(() => CombosEntity, {
    through: { model: () => ComboSauceEntity },
    as: 'comboSauce',
  })
  comboSauce?: CombosEntity;

  @BeforeCreate
  static async setDefaultId(entity: SauceEntity) {
    const idNumber = await getNextId(entity.sequelize, 'sauces_sequence');

    entity.id = idNumber;
  }
}
