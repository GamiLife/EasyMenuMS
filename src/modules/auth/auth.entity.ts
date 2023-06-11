import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  BeforeCreate,
  BelongsTo,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { UserEntity } from '../users/users.entity';

@Exclude()
@Table({
  tableName: 'auth',
})
export class AuthEntity extends Model<AuthEntity> {

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
  key: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  refreshKey: string;
  
  @Expose()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiry: Date;
  
  @Expose()
  @Type(() => UserEntity)
  @BelongsTo(() => UserEntity, {
    foreignKey: "userId",
    as: 'user',
    onDelete: "CASCADE"
  })
  user: UserEntity;

  @BeforeCreate
  static async setDefaultId(entity: AuthEntity) {
    const idNumber = await getNextId(entity.sequelize, 'users_sequence');

    entity.id = idNumber;
  }
}
