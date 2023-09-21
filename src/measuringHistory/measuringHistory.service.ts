import { Inject, Injectable } from '@nestjs/common';
import { MEASURING_HISTORY_REPOSITORY } from 'src/database/constants';
import {
  Device,
  Farm,
  MeassuringHistorical,
  Sensor,
} from 'src/database/entities';

@Injectable()
export class MeasuringHistoryService {
  constructor(
    @Inject(MEASURING_HISTORY_REPOSITORY)
    private measuringHistoryRepository: typeof MeassuringHistorical,
  ) {}
  value: string;
  async create(args: {
    value: string;
    sensorId: string;
    deviceId: string;
    farmId?: string;
  }): Promise<MeassuringHistorical> {
    const device = await Device.findOne({
      where: { id: args.deviceId },
    });
    return await this.measuringHistoryRepository.create({
      ...args,
      farmId: device?.farmId ?? null,
    });
  }

  async findAll(farmId: string): Promise<MeassuringHistorical[] | null> {
    return this.measuringHistoryRepository.findAll({
      where: {
        farmId,
      },
      group: ['id', 'sensorId', 'value', 'deviceId', 'farmId'],
      include: [Farm, Sensor, Device],
    });
  }

  async update(
    id: string,
    args: {
      value?: string;
    },
  ): Promise<MeassuringHistorical | null> {
    await this.measuringHistoryRepository.update(args, {
      where: {
        id,
      },
    });
    return this.measuringHistoryRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<object> {
    await this.measuringHistoryRepository.destroy({
      where: {
        id,
      },
    });
    return { message: 'delete success' };
  }
}
