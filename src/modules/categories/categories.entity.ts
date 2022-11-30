import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { CompanyEntity } from '../companies/company.entity';
import { DishEntity } from '../dishes/entities/dishes.entity';

@Table({
  tableName: 'categories',
})
export class CategoryEntity extends Model<CategoryEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  iconId: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  companyId: number;

  @HasOne(() => CompanyEntity, {
    sourceKey: 'companyId',
    foreignKey: 'id',
    as: 'company',
  })
  company: CompanyEntity;

  @BelongsTo(() => DishEntity, {
    targetKey: 'id',
    foreignKey: 'dishId',
    as: 'dish',
  })
  dish: DishEntity;
}
