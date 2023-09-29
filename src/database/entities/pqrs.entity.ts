import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import { User } from './user.entity';
import { Company } from './company.entity';

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

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;
}
