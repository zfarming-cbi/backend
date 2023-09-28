import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  timestamps: true,
})
export class Rol extends Model {
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

  @HasMany(() => User)
  users: User[];
}
