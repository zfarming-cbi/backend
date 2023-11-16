import { Inject, Injectable } from '@nestjs/common';
import { Op, literal } from 'sequelize';
import { PLANTS } from 'src/auth/constants';
import { PLANT_REPOSITORY } from 'src/database/constants';
import {
  Device,
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
      include: [PlantGaleryLikes, PlantGaleryComments],
    });
  }

  async findAll(
    pagination: {
      page: string;
      perPage: string;
      search: string;
    },
    tokenDecode?: any,
  ): Promise<Plant[] | null> {
    const companyId = tokenDecode.companyId;
    const builtFilter = {
      companyId,
      name: {
        [Op.like]: `%${pagination.search ?? ''}%`,
      },
    };
    const page = parseInt(pagination.page);
    const perPage = parseInt(pagination.perPage);
    const offset = (page - 1) * perPage;
    return this.plantRepository.findAll({
      limit: perPage,
      offset: offset,
      where: builtFilter,
      include: Device,
    });
  }

  async findAllForGalery(pagination: {
    page: string;
    perPage: string;
    search: string;
    order?: string;
  }): Promise<Plant[] | null> {
    const page = parseInt(pagination.page);
    const perPage = parseInt(pagination.perPage);
    const offset = (page - 1) * perPage;
    const builtFilter = {
      public: true,
      name: { [Op.like]: `%${pagination.search ?? ''}%` },
    };
    let fieldOrder: string = '';
    if (pagination.order === PLANTS.LIKE) {
      return this.plantRepository.findAll({
        attributes: {
          include: [
            [
              literal(
                '(SELECT COUNT(*) FROM PlantGaleryLikes WHERE PlantGaleryLikes.plantId = Plant.id AND PlantGaleryLikes.like = true)',
              ),
              'likeCount',
            ],
          ],
        },
        limit: perPage,
        offset: offset,
        where: builtFilter,
        include: [
          {
            model: PlantGaleryLikes,
            where: { like: true },
          },
          {
            model: PlantGaleryComments,
          },
        ],
        order: [[literal('likeCount'), 'DESC']],
      });
    } else if (pagination.order === PLANTS.LASTUPDATED) {
      fieldOrder = 'updatedAt';
    } else {
      fieldOrder = 'createdAt';
    }
    return this.plantRepository.findAll({
      limit: perPage,
      offset: offset,
      where: builtFilter,
      include: [
        {
          model: PlantGaleryLikes,
        },
        {
          model: PlantGaleryComments,
        },
      ],
      order: [[fieldOrder, 'DESC']],
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
