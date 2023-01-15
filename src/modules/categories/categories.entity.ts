import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
  PrimaryKey,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CompanyEntity } from '../companies/company.entity';
import { DishEntity } from '../dishes/entities/dishes.entity';

@Exclude()
@Table({
  tableName: 'categories',
})
export class CategoryEntity extends Model<CategoryEntity> {
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
    type: DataType.STRING,
    allowNull: true,
  })
  iconId: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imageCategory: string;

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
  @BelongsTo(() => DishEntity, {
    targetKey: 'id',
    foreignKey: 'dishId',
    as: 'dish',
  })
  dish: DishEntity;

  @BeforeCreate
  static async setDefaultId(entity: CategoryEntity) {
    const idNumber = await getNextId(entity.sequelize, 'categories_sequence');

    entity.id = idNumber;
  }

  @BeforeUpdate
  @BeforeCreate
  static validateIconOrImage(category: CategoryEntity) {
    if (!category.iconId && !category.imageCategory) {
      throw new Error(
        'IconId field or ImageCategory must be filled at least one of them'
      );
    }

    return category;
  }
}
