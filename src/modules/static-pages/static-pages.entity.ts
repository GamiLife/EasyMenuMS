import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import {
  BeforeCreate,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { getNextId } from 'src/core/helpers';
import { LocationsEntity } from 'src/modules/locations/locations.entity';
import { CompanyEntity } from '../companies/company.entity';
import { EPageType } from './static-pages.dto';

@Exclude()
@Table({
  tableName: 'static_pages',
})
export class StaticPagesEntity extends Model<StaticPagesEntity> {
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
  url: string;

  @Expose()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  htmlContent: string;

  @Expose()
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  companyId: number;

  @Expose()
  @Column({
    defaultValue: EPageType.informative,
    allowNull: false,
    validate: {
      customValidator: (value) => {
        const enums = [EPageType.editable, EPageType.informative];
        if (!enums.includes(value)) {
          throw new Error('not a valid option');
        }
      },
    },
  })
  pageType: EPageType;

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
    const idNumber = await getNextId(entity.sequelize, 'static_pages_sequence');

    entity.id = idNumber;
  }
}
