import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from './user.entity';
import { Device } from './device.entity';
import { Farm } from './farm.entity';
import { Plant } from './plant.entity';
import { Pqrs } from './pqrs.entity';

@Table
export class Company extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nit: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo: string;

  @HasMany(() => User)
  employes: User[];

  @HasMany(() => Farm)
  farms: Farm[];

  @HasMany(() => Plant)
  plants_galery: Plant[];

  @HasMany(() => Device)
  devices: Device[];

  @HasMany(() => Pqrs)
  tickets: Pqrs[];
}
