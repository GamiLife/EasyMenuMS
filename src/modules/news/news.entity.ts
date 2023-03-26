import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  PrimaryKey,
  BeforeCreate,
  BelongsTo,
} from 'sequelize-typescript';
import { getNextId, transformUTCDate } from 'src/core/helpers';
import { CompanyEntity } from '../companies/company.entity';

@Table({
  tableName: 'news',
})
export class NewEntity extends Model<NewEntity> {
  @PrimaryKey
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
    type: DataType.DATE,
    allowNull: false,
    get: function () {
      const currentValue = this.getDataValue('startDate') as Date;
      return transformUTCDate(currentValue);
    },
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    get: function () {
      const currentValue = this.getDataValue('endDate') as Date;
      return transformUTCDate(currentValue);
    },
  })
  endDate: Date;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  companyId: number;

  @BelongsTo(() => CompanyEntity, {
    foreignKey: 'companyId',
    as: 'company',
  })
  company: CompanyEntity;

  @BeforeCreate
  static async setDefaultId(entity: NewEntity) {
    const idNumber = await getNextId(entity.sequelize, 'news_sequence');

    entity.id = idNumber;
  }
}
