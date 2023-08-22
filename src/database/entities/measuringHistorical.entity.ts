import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Sensor } from './sensor.entity';
import { Device } from './device.entity';
import { Farm } from './farm.entity';

@Table({
  timestamps: true,
})
export class MeassuringHistorical extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @ForeignKey(() => Sensor)
  @Column
  sensorId: number;

  @BelongsTo(() => Sensor, 'sensorId')
  sensor: Sensor;

  @ForeignKey(() => Device)
  @Column
  deviceId: number;

  @BelongsTo(() => Device, 'deviceId')
  device: Device;

  @ForeignKey(() => Farm)
  @Column
  farmId: number;

  @BelongsTo(() => Farm, 'farmId')
  farm: Farm;
}
