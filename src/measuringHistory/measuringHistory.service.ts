import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { FARMS } from 'src/auth/constants';
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

  async findAllForHistory(
    tokenDecode?: any,
    search?: string,
  ): Promise<Farm[] | null> {
    const companyId = tokenDecode.companyId;
    const builtFilter: {
      '$farm.companyId$': string;
      '$farm.end_crop_dt$'?: any;
    } = {
      '$farm.companyId$': companyId,
    };
    const currentDate = Date.now();
    if (search && search === FARMS.INACTIVE) {
      builtFilter['$farm.end_crop_dt$'] = {
        [Op.lt]: new Date(currentDate),
      };
    }
    const meassurings = await this.measuringHistoryRepository.findAll({
      attributes: ['farmId'],
      where: builtFilter,
      order: [['farm', 'end_crop_dt', 'DESC']],
      include: [{ model: Farm }],
      group: ['farmId'],
    });
    return meassurings.map((measuring) => measuring.farm);
  }

  async findAll(deviceId: string): Promise<{
    dates: string[];
    maxRange: number;
    names: any[];
    data: Record<string, any>;
  } | null> {
    const dateFilter = new Date();
    dateFilter.setDate(dateFilter.getDate() - 1);
    const measurings = await this.measuringHistoryRepository.findAll({
      attributes: [
        'sensorId',
        [
          Sequelize.literal('DATE(MeassuringHistorical.createdAt)'),
          'createdAt',
        ],
        [Sequelize.fn('AVG', Sequelize.literal('value')), 'value'],
      ],
      where: {
        deviceId: deviceId,
        createdAt: {
          [Op.gte]: dateFilter,
        },
      },
      group: ['createdAt', 'sensorId'],
      include: [
        { model: Farm, attributes: [] },
        { model: Sensor, attributes: ['name', 'min_range', 'max_range'] },
        { model: Device, attributes: [] },
      ],
      order: ['createdAt'],
      raw: true,
    });

    const dates = measurings
      .map(({ createdAt }) => createdAt)
      .sort((a, b) => new Date(a).getDate() - new Date(b).getDate());
    const datesFormated = dates.map((date) =>
      new Date(date).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
      }),
    );

    const namesSensor = measurings.map(
      (measuring) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        measuring['sensor.name'],
    );
    const ranges = measurings.map(
      (measuring) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        measuring['sensor.max_range'],
    );
    const dataGroupBySensor = measurings.reduce(
      (acc, sensorData) => {
        if (Object.keys(acc).includes(sensorData.sensorId + '')) {
          acc[sensorData.sensorId + ''].values.push(sensorData.value);
          acc[sensorData.sensorId + ''].date.push(sensorData.createdAt);
          return acc;
        }
        return {
          ...acc,
          [sensorData.sensorId]: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            name: sensorData['sensor.name'],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            minRange: sensorData['sensor.min_range'],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            maxRange: sensorData['sensor.max_range'],
            values: [sensorData.value],
            date: [sensorData.createdAt],
          },
        };
      },
      {} as Record<string, any>,
    );

    Object.keys(dataGroupBySensor).forEach((key) => {
      dataGroupBySensor[key].values = Array.from(
        new Set(dates.map((a) => a.toString())),
      ).map((date) => {
        const idx = dataGroupBySensor[key].date.findIndex((d: any) => {
          return d === date;
        });
        if (idx === -1) {
          return null;
        }
        return dataGroupBySensor[key].values[idx];
      });
    });
    const orderData = Object.keys(dataGroupBySensor).map((key) => ({
      sensorId: key,
      name: dataGroupBySensor[key].name,
      values: dataGroupBySensor[key].values,
      minRange: dataGroupBySensor[key].minRange,
      maxRange: dataGroupBySensor[key].maxRange,
    }));
    return {
      names: namesSensor,
      maxRange: Math.max(...ranges),
      dates: Array.from(new Set(datesFormated.map((a) => a.toString()))),
      data: orderData,
    };
  }
  async findDataForDays(deviceId: string): Promise<object> {
    const dateFilter = new Date();
    dateFilter.setDate(dateFilter.getDate() - 1);
    const measurings = await this.measuringHistoryRepository.findAll({
      attributes: [
        'sensorId',
        [
          Sequelize.fn(
            'ROUND',
            Sequelize.fn('AVG', Sequelize.literal('value')),
            2,
          ),
          'value',
        ],
      ],
      where: {
        deviceId: deviceId,
        createdAt: {
          [Op.gte]: dateFilter,
        },
      },
      group: ['sensorId'],
      include: [
        { model: Farm, attributes: [] },
        { model: Sensor, attributes: ['name', 'min_range', 'max_range'] },
        { model: Device, attributes: [] },
      ],
      raw: true,
    });
    const ranges = measurings.map(
      (measuring) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        measuring['sensor.max_range'],
    );
    const namesSensor = measurings.map(
      (measuring) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        measuring['sensor.name'],
    );

    const values = measurings.map(
      (measuring) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        measuring['value'],
    );

    return {
      namesSensor,
      maxRange: Math.max(...ranges),
      data: values,
    };
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
