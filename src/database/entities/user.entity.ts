import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Company } from './';
import { PlantGaleryLikes } from './plantGaleryLikes.entity';
import { PlantGaleryComments } from './plantGaleryComments.entity';

@Table({
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    set(this, val: string) {
      this.setDataValue('password', bcrypt.hashSync(val, 10));
    },
  })
  password: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company, 'companyId')
  company: Company;

  @HasMany(() => PlantGaleryLikes)
  likes_to_plants_galery: PlantGaleryLikes[];

  @HasMany(() => PlantGaleryComments)
  comments_to_plants_galery: PlantGaleryComments[];
}
