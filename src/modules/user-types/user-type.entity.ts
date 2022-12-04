import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { UserEntity } from '../users/users.entity';
import { Expose, Type, Exclude } from '@nestjs/class-transformer';

@Exclude()
@Table({
  tableName: 'user_types',
})
export class UserTypeEntity extends Model<UserTypeEntity> {
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
    foreignKey: 'userTypeId',
    as: 'user',
  })
  user: UserEntity;
}
