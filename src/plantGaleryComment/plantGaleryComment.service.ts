import { Inject, Injectable } from '@nestjs/common';
import { GALERY_PLANTS_COMMENTS_REPOSITORY } from 'src/database/constants';
import { PlantGaleryComments } from 'src/database/entities';

@Injectable()
export class PlantGaleryCommentService {
  constructor(
    @Inject(GALERY_PLANTS_COMMENTS_REPOSITORY)
    private plantGaleryCommentRepository: typeof PlantGaleryComments,
  ) {}
  value: string;
  async create(args: {
    message: string;
    date: string;
    userId: string;
    plantId: string;
  }): Promise<PlantGaleryComments> {
    return await this.plantGaleryCommentRepository.create(args);
  }

  async findAll(farmId: string): Promise<PlantGaleryComments[] | null> {
    return this.plantGaleryCommentRepository.findAll({
      where: {
        farmId,
      },
    });
  }

  async update(
    id: string,
    args: {
      message?: string;
      date?: string;
    },
  ): Promise<PlantGaleryComments | null> {
    await this.plantGaleryCommentRepository.update(args, {
      where: {
        id,
      },
    });
    return this.plantGaleryCommentRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<object> {
    await this.plantGaleryCommentRepository.destroy({
      where: {
        id,
      },
    });
    return { message: 'delete success' };
  }
}
