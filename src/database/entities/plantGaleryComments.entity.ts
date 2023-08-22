import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Plant } from './plant.entity';
import { User } from './user.entity';

@Table({
  timestamps: true,
})
export class PlantGaleryComments extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @ForeignKey(() => Plant)
  @Column
  plantId: number;

  @BelongsTo(() => Plant, 'plantId')
  plant: Plant;
}
