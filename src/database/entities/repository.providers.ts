import {
  COMPANY_REPOSITORY,
  USER_REPOSITORY,
  DEVICE_REPOSITORY,
  FARM_REPOSITORY,
  GALERY_PLANTS_COMMENTS_REPOSITORY,
  GALERY_PLANTS_LIKES_REPOSITORY,
  PLANT_REPOSITORY,
  SENSOR_REPOSITORY,
  MEASURING_HISTORY_REPOSITORY,
  SUGGESTION_REPOSITORY,
} from '../constants';
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
  Suggestion,
} from './';

export const repositoryProviders = [
  {
    provide: COMPANY_REPOSITORY,
    useValue: Company,
  },
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: SUGGESTION_REPOSITORY,
    useValue: Suggestion,
  },
  {
    provide: PLANT_REPOSITORY,
    useValue: Plant,
  },
  {
    provide: GALERY_PLANTS_LIKES_REPOSITORY,
    useValue: PlantGaleryLikes,
  },
  {
    provide: GALERY_PLANTS_COMMENTS_REPOSITORY,
    useValue: PlantGaleryComments,
  },
  {
    provide: FARM_REPOSITORY,
    useValue: Farm,
  },
  {
    provide: DEVICE_REPOSITORY,
    useValue: Device,
  },
  {
    provide: SENSOR_REPOSITORY,
    useValue: Sensor,
  },
  {
    provide: MEASURING_HISTORY_REPOSITORY,
    useValue: MeassuringHistorical,
  },
];
