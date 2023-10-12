import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { DEVICE_REPOSITORY } from 'src/database/constants';
import {
  Device,
  Farm,
  MeassuringHistorical,
  Plant,
} from 'src/database/entities';

@Injectable()
export class DeviceService {
  constructor(
    @Inject(DEVICE_REPOSITORY)
    private deviceRepository: typeof Device,
  ) {}

  async create(
    args: {
      name: string;
      description: string;
      code: string;
      companyId?: string;
    },
    tokenDecode?: any,
  ): Promise<Device> {
    args.companyId = tokenDecode.companyId;
    return await this.deviceRepository.create(args);
  }

  async findOne(id: string): Promise<Device | null> {
    return this.deviceRepository.findOne({
      where: {
        id,
      },
      include: [Plant, Farm],
    });
  }

  async findAllUnasigned(tokenDecode?: any): Promise<Device[] | null> {
    const companyId = tokenDecode.companyId;
    return this.deviceRepository.findAll({
      where: {
        companyId: companyId,
        farmId: null,
      },
    });
  }

  async findAll(
    pagination: {
      page: string;
      perPage: string;
      search: string;
    },
    tokenDecode?: any,
  ): Promise<Device[] | null> {
    const companyId = tokenDecode.companyId;
    const builtFilter = {
      companyId: companyId,
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${pagination.search ?? ''}%`,
          },
        },
        {
          code: {
            [Op.like]: `%${pagination.search ?? ''}%`,
          },
        },
      ],
    };
    return this.deviceRepository.findAll({
      where: builtFilter,
      include: [Plant, MeassuringHistorical],
    });
  }

  async findDeviceByFarm(
    farmId: string,
    tokenDecode?: any,
  ): Promise<Device[] | null> {
    const companyId = tokenDecode.companyId;
    const builtFilter: { companyId: string; farmId?: string } = {
      companyId: companyId,
      farmId: farmId,
    };
    return this.deviceRepository.findAll({
      where: builtFilter,
      include: [Plant, MeassuringHistorical],
    });
  }

  async update(
    id: string,
    args: {
      name?: string;
      description?: string;
      code?: string;
      plantId?: string;
      farmId?: string;
    },
  ): Promise<Device | null> {
    await this.deviceRepository.update(args, {
      where: {
        id,
      },
    });
    return this.deviceRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<object> {
    await this.deviceRepository.destroy({
      where: {
        id,
      },
    });
    return { message: 'delete success' };
  }
}
