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
  User,
} from './entities';
import { SEQUELIZE } from './constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'db',
        timezone: '-05:00',
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
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
