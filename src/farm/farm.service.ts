import { Inject, Injectable } from '@nestjs/common';
import { FARM_REPOSITORY } from 'src/database/constants';
import { Farm } from 'src/database/entities';

@Injectable()
export class FarmService {
  constructor(
    @Inject(FARM_REPOSITORY)
    private farmRepository: typeof Farm,
  ) {}

  async create(
    args: {
      name: string;
      description: string;
      start_crop_dt: string;
      end_crop_dt: string;
    },
    tokenDecode?: any,
  ): Promise<Farm> {
    return await this.farmRepository.create({
      name: args.name,
      description: args.description,
      start_crop_dt: args.start_crop_dt,
      end_crop_dt: args.end_crop_dt,
      companyId: tokenDecode.companyId,
    });
  }

  async findOne(name: string): Promise<Farm | null> {
    return this.farmRepository.findOne({
      where: {
        name,
      },
    });
  }

  async findAll(tokenDecode?: any): Promise<Farm[] | null> {
    const companyId = tokenDecode.companyId;
    return this.farmRepository.findAll({
      where: {
        companyId,
      },
    });
  }
}
