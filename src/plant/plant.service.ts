import { Inject, Injectable } from '@nestjs/common';
import { PLANT_REPOSITORY } from 'src/database/constants';
import { Plant } from 'src/database/entities';

@Injectable()
export class PlantService {
  constructor(
    @Inject(PLANT_REPOSITORY)
    private plantRepository: typeof Plant,
  ) {}

  async create(
    args: {
      name: string;
      content: string;
      image: string;
      public: boolean;
      growing_time: string;
      companyId?: string;
    },
    tokenDecode?: any,
  ): Promise<Plant> {
    args.companyId = tokenDecode.companyId;
    return await this.plantRepository.create(args);
  }

  async findOne(name: string): Promise<Plant | null> {
    return this.plantRepository.findOne({
      where: {
        name,
      },
    });
  }

  async findAll(
    pagination: {
      limit: number;
      offset: number;
    },
    tokenDecode?: any,
  ): Promise<Plant[] | null> {
    const companyId = tokenDecode.companyId;
    return this.plantRepository.findAll({
      offset: 5,
      limit: 10,
      where: { companyId },
    });
  }
  async update(
    id: string,
    args: {
      name?: string;
      content?: string;
      image?: string;
      public?: boolean;
      growing_time?: string;
    },
  ): Promise<Plant | null> {
    await this.plantRepository.update(args, {
      where: {
        id,
      },
    });
    return this.plantRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<object> {
    await this.plantRepository.destroy({
      where: {
        id,
      },
    });
    return { message: 'delete success' };
  }
}
