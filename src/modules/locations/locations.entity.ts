import { Expose, Exclude, Type } from '@nestjs/class-transformer';

import {
  BeforeCreate,
  Column,
  DataType,
  HasOne,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { CompanyEntity } from '../companies/company.entity';

@Exclude()
@Table({
  tableName: 'locations',
})
export class LocationsEntity extends Model<LocationsEntity> {
  @Expose()
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    //defaultValue: sequelize.Sequelize.literal("nextval('locations_sequence')"),
  })
  id: number;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Expose()
  @Length({ min: 9, max: 100 })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Expose()
  @Length({ min: 9, max: 20 })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Expose()
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  companyId: number;

  @Expose()
  @Type(() => CompanyEntity)
  @HasOne(() => CompanyEntity, {
    sourceKey: 'companyId',
    foreignKey: 'id',
    as: 'company',
  })
  company: CompanyEntity;

  @BeforeCreate
  static async setDefaultId(entity: LocationsEntity) {
    const idNumber = await getNextId(entity.sequelize, 'locations_sequence');

    entity.id = idNumber;
  }
}
