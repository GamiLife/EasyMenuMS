import { Exclude, Expose } from '@nestjs/class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  PrimaryKey,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';

@Exclude()
@Table({
  tableName: 'histories',
})
export class HistoryModel extends Model<HistoryModel> {
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
  moduleName: string;

  @Expose()
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: Record<string, any>;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  createdBy: string;

  @BeforeCreate
  static async setDefaultId(entity: HistoryModel) {
    const idNumber = await getNextId(entity.sequelize, 'histories_sequence');

    entity.id = idNumber;
  }
}
