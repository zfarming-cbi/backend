import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  MEASURING_HISTORY_REPOSITORY,
  SENSOR_REPOSITORY,
} from 'src/database/constants';
import { MeassuringHistorical, Sensor } from 'src/database/entities';

@Injectable()
export class TasksService {
  @Inject(MEASURING_HISTORY_REPOSITORY)
  private measuringHistoryRepository: typeof MeassuringHistorical;
  @Inject(SENSOR_REPOSITORY)
  private sensorRepository: typeof Sensor;
  private readonly logger = new Logger(TasksService.name);

  @Cron('59 * * * * *')
  async handleCron() {
    const sensors = await this.sensorRepository.findAll();
    const meassurings = sensors.map((sensor) => ({
      value: (Math.random() * 10).toFixed(2),
      sensorId: sensor.id,
      deviceId: 1,
      farmId: 1,
    }));
    console.log('measurings', meassurings);
    await this.measuringHistoryRepository.bulkCreate(meassurings);
    this.logger.log('Task created measurings executed');
  }
}
