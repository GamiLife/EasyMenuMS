import { Expose, Type, Exclude } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { CategoryEntity } from '../categories/categories.entity';
import { DishEntity } from '../dishes/entities/dishes.entity';
import { NewEntity } from '../news/news.entity';
import { SauceEntity } from '../sauces/sauces.entity';
import { UserEntity } from '../users/users.entity';

@Exclude()
@Table({
  tableName: 'companies',
})
export class CompanyEntity extends Model<CompanyEntity> {
  @Expose()
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Expose()
  @Type(() => UserEntity)
  @BelongsTo(() => UserEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'user',
  })
  user: UserEntity;

  @Expose()
  @Type(() => NewEntity)
  @BelongsTo(() => NewEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'new',
  })
  new: NewEntity;

  @Expose()
  @Type(() => CategoryEntity)
  @BelongsTo(() => CategoryEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'category',
  })
  category: CategoryEntity;

  @Expose()
  @Type(() => SauceEntity)
  @BelongsTo(() => SauceEntity, {
    targetKey: 'id',
    foreignKey: 'sauceId',
    as: 'sauce',
  })
  sauce: SauceEntity;

  @Expose()
  @Type(() => DishEntity)
  @BelongsTo(() => DishEntity, {
    targetKey: 'id',
    foreignKey: 'dishId',
    as: 'dish',
  })
  dish: DishEntity;
}
