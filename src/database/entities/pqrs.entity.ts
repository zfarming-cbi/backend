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
    type: DataType.INTEGER,
    allowNull: true,
  })
  companyId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;
}
