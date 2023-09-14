import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Company, Farm, Rol, UserFarm } from './';
import { PlantGaleryLikes } from './plantGaleryLikes.entity';
import { PlantGaleryComments } from './plantGaleryComments.entity';
import { UserRol } from './userRol.entity';

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
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  uuid_forgot: string;

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

  @BelongsToMany(() => Farm, () => UserFarm)
  farms: Farm[];

  @BelongsToMany(() => Rol, () => UserRol)
  rols: Rol[];
}
