import { Inject, Injectable } from '@nestjs/common';
import { GALERY_PLANTS_COMMENTS_REPOSITORY } from 'src/database/constants';
import { PlantGaleryComments, User } from 'src/database/entities';

@Injectable()
export class PlantGaleryCommentService {
  constructor(
    @Inject(GALERY_PLANTS_COMMENTS_REPOSITORY)
    private plantGaleryCommentRepository: typeof PlantGaleryComments,
  ) {}
  value: string;
  async create(
    args: {
      message: string;
      date?: string;
      plantId: string;
      userId?: number;
    },
    decodeToken?: any,
  ): Promise<PlantGaleryComments> {
    const userId = decodeToken.sub;
    const currentDate = new Date();
    args.userId = userId;
    args.date = currentDate.toISOString();
    return await this.plantGaleryCommentRepository.create(args);
  }

  async findAll(plantId: string): Promise<PlantGaleryComments[] | null> {
    return this.plantGaleryCommentRepository.findAll({
      where: {
        plantId,
      },
      include: User,
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
