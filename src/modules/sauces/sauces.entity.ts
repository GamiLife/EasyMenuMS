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
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CompanyEntity } from '../companies/company.entity';
import { DishEntity } from '../dishes/entities';
import { DishSauceEntity } from '../dishes/entities/dishes-sauces.entity';

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
  price: number;

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
  @HasOne(() => CompanyEntity, {
    sourceKey: 'companyId',
    foreignKey: 'id',
    as: 'company',
  })
  company: CompanyEntity;

  @Expose()
  @Type(() => DishEntity)
  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishSauceEntity },
    as: 'sauceFromDish',
  })
  sauceFromDish?: DishEntity;

  @BeforeCreate
  static async setDefaultId(entity: SauceEntity) {
    const idNumber = await getNextId(entity.sequelize, 'sauces_sequence');

    entity.id = idNumber;
  }
}
