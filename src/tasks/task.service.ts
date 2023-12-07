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
      value: Math.floor(
        Math.random() * (sensor.max_range - sensor.min_range + 1) +
          sensor.min_range,
      ),
      sensorId: sensor.id,
      deviceId: 1,
      farmId: 1,
    }));
    await this.measuringHistoryRepository.bulkCreate(meassurings);
    this.logger.log('Task created measurings executed');
  }
}
