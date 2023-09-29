import { Sequelize } from 'sequelize-typescript';
import {
  Company,
  Device,
  Farm,
  Group,
  MeassuringHistorical,
  Plant,
  PlantGaleryComments,
  PlantGaleryLikes,
  Pqrs,
  Sensor,
  User,
} from './entities';
import { SEQUELIZE } from './constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        port: 3306,
        dialect: 'mysql',
        timezone: '-05:00',
        host: configService.get('database.host'),
        database: configService.get('database.name'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
      });
      sequelize.addModels([
        Company,
        User,
        Plant,
        PlantGaleryLikes,
        PlantGaleryComments,
        Device,
        Sensor,
        Farm,
        MeassuringHistorical,
        Group,
        Pqrs,
      ]);
      User.belongsToMany(Farm, { through: 'UserFarm' });
      Farm.belongsToMany(User, { through: 'UserFarm' });
      User.belongsToMany(Group, { through: 'UserGroup' });
      Group.belongsToMany(User, { through: 'UserGroup' });
      await sequelize.sync();
      return sequelize;
    },
  },
];
