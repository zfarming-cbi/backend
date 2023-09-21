import { Table, Column, Model, DataType } from 'sequelize-typescript';

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

  // @BelongsToMany(() => User, 'userId')
  // users: User[];
}
