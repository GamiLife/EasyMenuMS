import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CompanyEntity } from '../companies/company.entity';
import { DishModel } from '../dishes/infraestructure/db/dish.model';

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
  @BelongsTo(() => CompanyEntity, {
    foreignKey: 'companyId',
    as: 'company',
  })
  company: CompanyEntity;

  @Expose()
  @Type(() => DishModel)
  @HasMany(() => DishModel, {
    foreignKey: 'categoryId',
    as: 'dishes',
  })
  dishes: DishModel[];

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
