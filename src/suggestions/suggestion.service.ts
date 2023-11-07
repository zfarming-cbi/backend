import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { SUGGESTION_REPOSITORY } from 'src/database/constants';
import { Suggestion, User } from 'src/database/entities';

@Injectable()
export class SuggestionService {
  constructor(
    @Inject(SUGGESTION_REPOSITORY)
    private suggestionRepository: typeof Suggestion,
  ) {}

  async create(
    args: {
      type: string;
      description?: string;
    },
    tokenDecode?: any,
  ): Promise<Suggestion> {
    return await this.suggestionRepository.create({
      type: args.type,
      description: args.description,
      userId: tokenDecode.sub,
      companyId: tokenDecode.companyId,
    });
  }

  async findOne(id: string): Promise<Suggestion | null> {
    return this.suggestionRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findAll(
    pagination: {
      page: string;
      perPage: string;
      search: string;
    },
    tokenDecode?: any,
  ): Promise<Suggestion[] | null> {
    const page = parseInt(pagination.page);
    const perPage = parseInt(pagination.perPage);
    const offset = (page - 1) * perPage;
    const builtFilter = {
      companyId: tokenDecode.companyId,
      description: {
        [Op.like]: `%${pagination.search ?? ''}%`,
      },
    };
    return this.suggestionRepository.findAll({
      limit: perPage,
      offset: offset,
      where: builtFilter,
      include: [{ model: User, attributes: { exclude: ['password'] } }],
      order: [['createdAt', 'DESC']],
    });
  }

  async update(
    id: string,
    args: {
      type: string;
      description?: string;
    },
  ): Promise<Suggestion | null> {
    await this.suggestionRepository.update(args, {
      where: {
        id,
      },
    });
    return this.suggestionRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<object> {
    await this.suggestionRepository.destroy({
      where: {
        id,
      },
    });
    return { message: 'delete success' };
  }
}
