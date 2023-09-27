import { Inject, Injectable } from '@nestjs/common';
import { PLANT_REPOSITORY } from 'src/database/constants';
import {
  Plant,
  PlantGaleryComments,
  PlantGaleryLikes,
} from 'src/database/entities';

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

  async findOne(id: string): Promise<Plant | null> {
    return this.plantRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(
    pagination: {
      page: string;
      perPage: string;
    },
    tokenDecode?: any,
  ): Promise<Plant[] | null> {
    const page = parseInt(pagination.page);
    const perPage = parseInt(pagination.perPage);
    const offset = (page - 1) * perPage;
    const companyId = tokenDecode.companyId;
    return this.plantRepository.findAll({
      limit: perPage,
      offset: offset,
      where: { companyId },
    });
  }

  async findAllForGalery(pagination: {
    page: string;
    perPage: string;
  }): Promise<Plant[] | null> {
    const page = parseInt(pagination.page);
    const perPage = parseInt(pagination.perPage);
    const offset = (page - 1) * perPage;
    return this.plantRepository.findAll({
      limit: perPage,
      offset: offset,
      include: [PlantGaleryLikes, PlantGaleryComments],
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
