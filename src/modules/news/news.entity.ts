import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  HasOne,
} from 'sequelize-typescript';
import { CompanyEntity } from '../companies/company.entity';

@Table({
  tableName: 'news',
})
export class NewEntity extends Model<NewEntity> {
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
  imageUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  backgroundColor: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  startDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  endDate: string;

  @HasOne(() => CompanyEntity, {
    sourceKey: 'companyId',
    foreignKey: 'id',
    as: 'company',
  })
  company: CompanyEntity;
}
