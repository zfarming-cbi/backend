import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class Pqrs extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  document: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;
}
