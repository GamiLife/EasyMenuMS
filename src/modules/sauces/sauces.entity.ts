import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  HasOne,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { CompanyEntity } from '../companies/company.entity';
import { DishEntity } from '../dishes/entities';
import { DishSauceEntity } from '../dishes/entities/dishes-sauces.entity';

@Table({
  tableName: 'sauces',
})
export class SauceEntity extends Model<SauceEntity> {
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
    type: DataType.FLOAT,
    allowNull: true,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl: string;

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

  @BelongsToMany(() => DishEntity, {
    through: { model: () => DishSauceEntity },
  })
  dishes?: DishEntity[];
}
