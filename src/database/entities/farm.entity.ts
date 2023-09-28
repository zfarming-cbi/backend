import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { Device } from './device.entity';
import { Company } from './company.entity';
import { MeassuringHistorical } from './measuringHistorical.entity';

@Table({
  timestamps: true,
})
export class Farm extends Model {
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
    type: DataType.DATE,
  })
  start_crop_dt: Date;

  @Column({
    type: DataType.DATE,
  })
  end_crop_dt: Date;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company, 'companyId')
  company: Company;

  @HasMany(() => Device)
  devices: Device[];

  @HasMany(() => MeassuringHistorical)
  measurings: MeassuringHistorical[];
}
