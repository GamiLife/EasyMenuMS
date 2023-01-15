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
} from 'sequelize-typescript';
import { CompanyEntity } from '../companies/company.entity';
import { DishEntity } from '../dishes/entities/dishes.entity';

@Exclude()
@Table({
  tableName: 'categories',
})
export class CategoryEntity extends Model<CategoryEntity> {
  @Expose()
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
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
