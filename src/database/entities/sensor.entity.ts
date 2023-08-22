import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { MeassuringHistorical } from './measuringHistorical.entity';

@Table({
  timestamps: true,
})
export class Sensor extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  graphical_unit: string;

  @Column({
    type: DataType.INTEGER,
  })
  min_range: number;

  @Column({
    type: DataType.INTEGER,
  })
  max_range: number;

  @HasMany(() => MeassuringHistorical)
  measuring_historical: MeassuringHistorical[];
}
