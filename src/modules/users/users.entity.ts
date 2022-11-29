import {
  Table,
  Column,
  Model,
  DataType,
  Validate,
  HasOne,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { CompanyEntity } from '../companies/company.entity';
import { UserTypeEntity } from '../user-types/user-type.entity';

@Table({
  tableName: 'users',
})
export class UserEntity extends Model<UserEntity> {
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
  names: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastnames: string;

  @Validate({
    isEmail: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.BIGINT,
  })
  userTypeId: number;

  @Column({
    type: DataType.BIGINT,
  })
  companyId: number;

  @HasOne(() => UserTypeEntity, {
    sourceKey: 'userTypeId',
    foreignKey: 'id',
    as: 'userType',
  })
  userType: UserTypeEntity;
  @HasOne(() => CompanyEntity, {
    sourceKey: 'companyId',
    foreignKey: 'id',
    as: 'company',
  })
  company: CompanyEntity;
}
