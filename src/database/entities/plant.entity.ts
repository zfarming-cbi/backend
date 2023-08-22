import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Device } from './device.entity';
import { Company } from './company.entity';
import { PlantGaleryLikes } from './plantGaleryLikes.entity';
import { PlantGaleryComments } from './plantGaleryComments.entity';

@Table
export class Plant extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @Column({
    type: DataType.DATE,
  })
  growing_time: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  public: boolean;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company, 'companyId')
  company: Company;

  @HasMany(() => Device)
  devices: Device[];

  @HasMany(() => PlantGaleryLikes)
  likes: PlantGaleryLikes[];

  @HasMany(() => PlantGaleryComments)
  comments: PlantGaleryComments[];
}
