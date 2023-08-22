import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { Company } from './company.entity';
import { MeassuringHistorical } from './measuringHistorical.entity';
import { Farm } from './farm.entity';
import { Plant } from './plant.entity';

@Table({
  timestamps: true,
})
export class Device extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @ForeignKey(() => Farm)
  @Column
  farmId: number;

  @BelongsTo(() => Farm, 'farmId')
  farm: Farm;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company, 'companyId')
  company: Company;

  @ForeignKey(() => Plant)
  @Column
  plantId: number;

  @BelongsTo(() => Plant, 'plantId')
  plant: Plant;

  @HasMany(() => MeassuringHistorical)
  measurings: MeassuringHistorical[];
}
