import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { UserRol } from './userRol.entity';

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

  @BelongsToMany(() => User, () => UserRol)
  users: User[];
}
