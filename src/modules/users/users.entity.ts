import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  Validate,
  HasOne,
  PrimaryKey,
  BeforeCreate,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CompanyEntity } from '../companies/company.entity';
import { UserTypeEntity } from '../user-types/user-type.entity';

@Exclude()
@Table({
  tableName: 'users',
})
export class UserEntity extends Model<UserEntity> {
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
  names: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastnames: string;

  @Expose()
  @Validate({
    isEmail: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Expose()
  @Column({
    type: DataType.BIGINT,
  })
  userTypeId: number;

  @Expose()
  @Column({
    type: DataType.BIGINT,
  })
  companyId: number;

  @Expose()
  @Type(() => UserTypeEntity)
  @HasOne(() => UserTypeEntity, {
    sourceKey: 'userTypeId',
    foreignKey: 'id',
    as: 'userType',
  })
  userType: UserTypeEntity;

  @Expose()
  @Type(() => CompanyEntity)
  @HasOne(() => CompanyEntity, {
    sourceKey: 'companyId',
    foreignKey: 'id',
    as: 'company',
  })
  company: CompanyEntity;

  @BeforeCreate
  static async setDefaultId(entity: UserEntity) {
    const idNumber = await getNextId(entity.sequelize, 'users_sequence');

    entity.id = idNumber;
  }
}
