import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  PrimaryKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { slugify } from 'src/core/helpers/slugify.helper';
import { CategoryEntity } from 'src/modules/categories/categories.entity';
import { ComboDishesModel } from 'src/modules/combos/infraestructure/db/combo-dishes.model';
import { CombosModel } from 'src/modules/combos/infraestructure/db/combos.model';
import { CompanyEntity } from 'src/modules/companies/company.entity';

@Exclude()
@Table({
  tableName: 'dishes',
})
export class DishModel extends Model<DishModel> {
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
    allowNull: true,
  })
  slug: string;

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
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxItems: number;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl: string;

  @Expose()
  @Column({
    type: DataType.BIGINT,
  })
  categoryId: number;

  @Expose()
  @Column({
    type: DataType.BIGINT,
  })
  companyId: number;

  @Expose()
  @Type(() => CategoryEntity)
  @BelongsTo(() => CategoryEntity, {
    foreignKey: 'categoryId',
    as: 'category',
  })
  category: CategoryEntity;

  @Expose()
  @Type(() => CompanyEntity)
  @BelongsTo(() => CompanyEntity, {
    foreignKey: 'companyId',
    as: 'company',
  })
  company: CompanyEntity;

  @Expose()
  @Type(() => CombosModel)
  @HasMany(() => CombosModel, {
    foreignKey: 'dishId',
    as: 'combos',
  })
  combos: CombosModel[];

  @Expose()
  @Type(() => CombosModel)
  @BelongsToMany(() => CombosModel, {
    through: { model: () => ComboDishesModel },
    as: 'comboDish',
  })
  comboDish?: CombosModel;

  @BeforeCreate
  static async setDefaultId(entity: DishModel) {
    const idNumber = await getNextId(entity.sequelize, 'dishes_sequence');

    entity.id = idNumber;
  }

  @BeforeCreate
  static slugFieldBeforeCreate(dish: DishModel) {
    if (dish.dataValues.title) {
      dish.dataValues.slug = slugify(dish.dataValues.title);
    }
  }
}
