import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Farm } from './farm.entity';
import { User } from './user.entity';

@Table({
  timestamps: true,
})
export class UserFarm extends Model {
  @ForeignKey(() => Farm)
  @Column
  farmId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
