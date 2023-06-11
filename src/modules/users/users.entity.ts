import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  Validate,
  PrimaryKey,
  BeforeCreate,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { createUid, getNextId } from 'src/core/helpers';
import { CompanyEntity } from '../companies/company.entity';
import { UserTypeEntity } from '../user-types/user-type.entity';
import { AuthEntity } from '../auth/auth.entity';

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
  @BelongsTo(() => UserTypeEntity, {
    foreignKey: 'userTypeId',
    as: 'userType',
  })
  userType: UserTypeEntity;

  @Expose()
  @Type(() => CompanyEntity)
  @BelongsTo(() => CompanyEntity, {
    foreignKey: 'companyId',
    as: 'company',
  })
  company: CompanyEntity;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: function(){
      return createUid()
    }
  })
  sub: string;
    
  @Expose()
  @Type(() => AuthEntity)
  @HasMany(() => AuthEntity, {
    foreignKey: "userId",
    as: 'auth',
    onDelete: "CASCADE"
  })
  auth: AuthEntity;

  @BeforeCreate
  static async setDefaultId(entity: UserEntity) {
    const idNumber = await getNextId(entity.sequelize, 'users_sequence');

    entity.id = idNumber;
  }
}