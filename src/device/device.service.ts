import { Inject, Injectable } from '@nestjs/common';
import { DEVICE_REPOSITORY } from 'src/database/constants';
import { Device } from 'src/database/entities';

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

  async findOne(code: string): Promise<Device | null> {
    return this.deviceRepository.findOne({
      where: {
        code,
      },
    });
  }

  async findAll(farmId?: string, tokenDecode?: any): Promise<Device[] | null> {
    const companyId = tokenDecode.companyId;
    const builtFilter: { companyId: string; farmId?: string } = {
      companyId: companyId,
    };
    if (farmId) {
      builtFilter.farmId = farmId;
    }
    return this.deviceRepository.findAll({
      where: builtFilter,
    });
  }

  async update(
    id: string,
    args: {
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
