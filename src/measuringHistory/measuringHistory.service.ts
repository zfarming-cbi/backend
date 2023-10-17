import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
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
    data: { value: string; code: string }[];
    deviceId: string;
    farmId?: string;
  }): Promise<MeassuringHistorical[]> {
    const device = await Device.findOne({
      where: { id: args.deviceId },
    });
    if (!device) throw new BadRequestException('El dispositivo no existe');
    const sensorCodes = args.data.map((item) => item.code);

    const sensors = await Sensor.findAll({
      where: {
        code: {
          [Op.in]: sensorCodes,
        },
      },
    });

    const measuringHistoryItems = args.data.map((item) => ({
      deviceId: args.deviceId,
      farmId: device?.farmId ?? null,
      sensorId: sensors.find((sensor) => sensor.code === item.code)?.id,
      value: item.value,
    }));
    return await this.measuringHistoryRepository.bulkCreate(
      measuringHistoryItems,
    );
  }

  async findAll(deviceId: string): Promise<object[] | null> {
    const results = await this.measuringHistoryRepository.findAll({
      attributes: [
        'sensorId',
        [Sequelize.fn('GROUP_CONCAT', Sequelize.col('value')), 'value'],
      ],
      where: { deviceId: deviceId },
      group: ['sensorId'],
      include: [
        { model: Farm, attributes: [] },
        { model: Sensor, attributes: [] },
        { model: Device, attributes: [] },
      ],
      raw: true,
    });
    console.log('result', results);
    const processedResults = results.map((result) => ({
      sensorId: result.sensorId,
      values: result.value.split(','),
    }));
    return processedResults;
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
}
