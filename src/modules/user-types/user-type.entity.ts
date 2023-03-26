import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import { UserEntity } from '../users/users.entity';
import { Expose, Type, Exclude } from '@nestjs/class-transformer';
import { getNextId } from 'src/core/helpers';

@Exclude()
@Table({
  tableName: 'user_types',
})
export class UserTypeEntity extends Model<UserTypeEntity> {
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
  name: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Expose()
  @Type(() => UserEntity)
  @HasMany(() => UserEntity, {
    foreignKey: 'userTypeId',
    as: 'users',
  })
  users: UserEntity[];

  @BeforeCreate
  static async setDefaultId(entity: UserTypeEntity) {
    const idNumber = await getNextId(entity.sequelize, 'user_types_sequence');

    entity.id = idNumber;
  }
}
