import { Inject, Injectable } from '@nestjs/common';
// import { Sequelize } from 'sequelize';
import {
  DEVICE_REPOSITORY,
  MEASURING_HISTORY_REPOSITORY,
} from 'src/database/constants';
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
    @Inject(DEVICE_REPOSITORY)
    private deviceRepository: typeof Device,
  ) {}

  async create(args: {
    data: { value: string; sensorId: string }[];
    deviceId: string;
    farmId?: string;
  }): Promise<MeassuringHistorical[]> {
    const device = await Device.findOne({
      where: { id: args.deviceId },
    });
    const measuringHistoryItems = args.data.map((item) => ({
      deviceId: args.deviceId,
      farmId: device?.farmId ?? null,
      sensorId: item.sensorId,
      value: item.value,
    }));
    return await this.measuringHistoryRepository.bulkCreate(
      measuringHistoryItems,
    );
  }

  async findAll(deviceId: string): Promise<MeassuringHistorical[] | null> {
    const device = await this.deviceRepository.findOne({
      where: {
        id: deviceId,
      },
    });
    // const device = await this.deviceService.findOne(deviceId);
    const builtFilter: { deviceId: string; farmId?: number } = {
      deviceId: deviceId,
    };
    if (device) {
      builtFilter.farmId = device.farmId;
    }
    return this.measuringHistoryRepository.findAll({
      // attributes: [
      //   'sensorId',
      //   [Sequelize.fn('array_agg', Sequelize.col('value')), 'values'],
      // ],
      where: builtFilter,
      group: ['sensorId'],
      include: [Farm, Sensor, Device],
      raw: true,
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
