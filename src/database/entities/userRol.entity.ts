import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.entity';
import { Rol } from './rol.entity';

@Table({
  timestamps: true,
})
export class UserRol extends Model {
  @ForeignKey(() => Rol)
  @Column
  rolId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
