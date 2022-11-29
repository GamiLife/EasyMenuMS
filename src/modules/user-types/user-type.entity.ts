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

@Table({
  tableName: 'user_types',
})
export class UserTypeEntity extends Model<UserTypeEntity> {
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
    foreignKey: 'userTypeId',
    as: 'user',
  })
  user: UserEntity;
}
