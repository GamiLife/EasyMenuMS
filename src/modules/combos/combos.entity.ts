import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  BelongsToMany,
  BeforeCreate,
  HasOne,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CompanyEntity } from 'src/modules/companies/company.entity';
import { DishDishesEntity } from '../dishes/entities/dishes-dishes.entity';
import { DishSauceEntity } from '../dishes/entities/dishes-sauces.entity';
import { DishEntity } from '../dishes/entities/dishes.entity';
import { SauceEntity } from '../sauces/sauces.entity';

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
  @Type(() => SauceEntity)
  @BelongsToMany(() => SauceEntity, {
    through: { model: () => DishSauceEntity },
    as: 'comboSauceFromDishSauce',
  })
  comboSauceFromDishSauce?: SauceEntity;

  @Expose()
  @Type(() => DishEntity)
  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishSauceEntity },
    as: 'comboDishFromDishSauce',
  })
  comboDishFromDishSauce?: DishEntity;

  @Expose()
  @Type(() => DishEntity)
  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishDishesEntity },
    as: 'comboMainDishFromDishDish',
  })
  comboMainDishFromDishDish?: DishEntity;

  @Expose()
  @Type(() => DishEntity)
  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishDishesEntity },
    as: 'comboSecondDishFromDishDish',
  })
  comboSecondDishFromDishDish?: DishEntity;

  @BeforeCreate
  static async setDefaultId(entity: CombosEntity) {
    const idNumber = await getNextId(entity.sequelize, 'combos_sequence');

    entity.id = idNumber;
  }
}
