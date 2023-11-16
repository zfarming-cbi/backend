import { Inject, Injectable } from '@nestjs/common';
import { GALERY_PLANTS_LIKES_REPOSITORY } from 'src/database/constants';
import { PlantGaleryLikes } from 'src/database/entities';

@Injectable()
export class PlantGaleryLikeService {
  constructor(
    @Inject(GALERY_PLANTS_LIKES_REPOSITORY)
    private plantGaleryLikeRepository: typeof PlantGaleryLikes,
  ) {}
  value: string;
  async create(args: {
    like: number;
    plantId: string;
    userId?: string;
  }): Promise<PlantGaleryLikes> {
    return await this.plantGaleryLikeRepository.create(args);
  }

  async findAll(plantId: string): Promise<PlantGaleryLikes[] | null> {
    return this.plantGaleryLikeRepository.findAll({
      where: {
        plantId,
        like: true,
      },
    });
  }

  async findOne(
    plantId: string,
    userId: string,
  ): Promise<PlantGaleryLikes | null> {
    return this.plantGaleryLikeRepository.findOne({
      where: {
        plantId,
        userId,
      },
    });
  }

  async update(
    id: string,
    args: {
      like?: number;
    },
  ): Promise<PlantGaleryLikes | null> {
    await this.plantGaleryLikeRepository.update(args, {
      where: {
        id,
      },
    });
    return this.plantGaleryLikeRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<object> {
    await this.plantGaleryLikeRepository.destroy({
      where: {
        id,
      },
    });
    return { message: 'delete success' };
  }
}
