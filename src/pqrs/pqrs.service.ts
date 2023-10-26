import { Inject, Injectable } from '@nestjs/common';
import { PQRS_REPOSITORY } from 'src/database/constants';
import { Pqrs, User } from 'src/database/entities';

@Injectable()
export class PqrsService {
  constructor(
    @Inject(PQRS_REPOSITORY)
    private pqrsRepository: typeof Pqrs,
  ) {}

  async create(
    args: {
      type: string;
      description: string;
    },
    tokenDecode?: any,
  ): Promise<Pqrs> {
    return await this.pqrsRepository.create({
      name: args.type,
      description: args.description,
      userId: tokenDecode.sub,
      companyId: tokenDecode.companyId,
    });
  }

  async findOne(id: string): Promise<Pqrs | null> {
    return this.pqrsRepository.findOne({
      where: { id },
      include: User,
    });
  }

  async findAll(
    pagination: {
      page: string;
      perPage: string;
    },
    tokenDecode?: any,
  ): Promise<Pqrs[] | null> {
    const page = parseInt(pagination.page);
    const perPage = parseInt(pagination.perPage);
    const offset = (page - 1) * perPage;
    const companyId = tokenDecode.companyId;
    return this.pqrsRepository.findAll({
      limit: perPage,
      offset: offset,
      where: {
        companyId,
      },
      include: User,
    });
  }

  async update(
    id: string,
    args: {
      name?: string;
      description?: string;
      start_crop_dt?: string;
      end_crop_dt?: string;
    },
  ): Promise<Pqrs | null> {
    await this.pqrsRepository.update(args, {
      where: {
        id,
      },
    });
    return this.pqrsRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<object> {
    await this.pqrsRepository.destroy({
      where: {
        id,
      },
    });
    return { message: 'delete success' };
  }
}
