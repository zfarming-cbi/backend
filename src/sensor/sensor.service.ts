import { Inject, Injectable } from '@nestjs/common';
import { SENSOR_REPOSITORY } from 'src/database/constants';
import { Sensor } from 'src/database/entities';

@Injectable()
export class SensorService {
  constructor(
    @Inject(SENSOR_REPOSITORY)
    private sensorRepository: typeof Sensor,
  ) {}

  async create(args: {
    name: string;
    code: string;
    description: string;
    graphical_unit: string;
    min_range: number;
    max_range: number;
  }): Promise<Sensor> {
    return await this.sensorRepository.create(args);
  }

  async findOne(code: string): Promise<Sensor | null> {
    return this.sensorRepository.findOne({
      where: {
        code,
      },
    });
  }

  async findAll(): Promise<Sensor[] | null> {
    return this.sensorRepository.findAll();
  }

  async update(
    id: string,
    args: {
      name?: string;
      code?: string;
      description?: string;
      graphical_unit?: string;
      min_range?: number;
      max_range?: number;
    },
  ): Promise<Sensor | null> {
    await this.sensorRepository.update(args, {
      where: {
        id,
      },
    });
    return this.sensorRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<object> {
    await this.sensorRepository.destroy({
      where: {
        id,
      },
    });
    return { message: 'delete success' };
  }
}
