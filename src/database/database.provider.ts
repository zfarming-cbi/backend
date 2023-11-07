import { Sequelize } from 'sequelize-typescript';
import {
  Company,
  Device,
  Farm,
  MeassuringHistorical,
  Plant,
  PlantGaleryComments,
  PlantGaleryLikes,
  Sensor,
  Suggestion,
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
        dialect: 'mysql',
        timezone: '-05:00',
        port: configService.get('database.port'),
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
        Suggestion,
      ]);
      User.belongsToMany(Farm, {
        as: 'farms',
        through: 'UserFarm',
      });
      Farm.belongsToMany(User, {
        as: 'users',
        through: 'UserFarm',
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
