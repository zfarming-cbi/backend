import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class Group extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  code: string;
}
