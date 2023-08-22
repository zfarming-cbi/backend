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
export class PlantGaleryLikes extends Model {
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  like: boolean;

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
