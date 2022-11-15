import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Company extends Model<Company> {
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
}
