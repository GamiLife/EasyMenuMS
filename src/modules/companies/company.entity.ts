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
import { NewEntity } from '../news/news.entity';
import { SauceEntity } from '../sauces/sauces.entity';
import { UserEntity } from '../users/users.entity';

@Table({
  tableName: 'companies',
})
export class CompanyEntity extends Model<CompanyEntity> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @BelongsTo(() => UserEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'user',
  })
  user: UserEntity;

  @BelongsTo(() => NewEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'new',
  })
  new: NewEntity;

  @BelongsTo(() => CategoryEntity, {
    targetKey: 'id',
    foreignKey: 'companyId',
    as: 'category',
  })
  category: CategoryEntity;

  @BelongsTo(() => SauceEntity, {
    targetKey: 'id',
    foreignKey: 'sauceId',
    as: 'sauce',
  })
  sauce: SauceEntity;
}
