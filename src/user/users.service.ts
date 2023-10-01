import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/database/constants';
import { Farm, Group, User } from 'src/database/entities';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User,
  ) {}

  async create(
    args: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      companyId?: string;
    },
    tokenDecode?: any,
  ): Promise<User> {
    const user = await this.findOne(args.email);
    if (user) throw new UnauthorizedException('El email ya esta en uso');
    let companyId;
    if (args.companyId) {
      companyId = args.companyId;
    }
    if (tokenDecode) {
      companyId = tokenDecode.companyId;
    }
    return await this.userRepository.create({
      firstname: args.firstname,
      lastname: args.lastname,
      email: args.email,
      password: args.password,
      companyId: companyId,
    });
  }

  async findOne(filter_: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        [Op.or]: [
          { email: filter_ },
          { uuid_forgot: filter_ },
          { id: filter_ },
        ],
      },
    });
  }

  async findAll(
    pagination: {
      page: string;
      perPage: string;
      search: string;
    },
    companyId?: number,
  ): Promise<User[]> {
    const builtFilter = {
      companyId,
      [Op.or]: [
        {
          firstname: {
            [Op.like]: `%${pagination.search ?? ''}%`,
          },
          lastname: {
            [Op.like]: `%${pagination.search ?? ''}%`,
          },
          email: {
            [Op.like]: `%${pagination.search ?? ''}%`,
          },
        },
      ],
    };
    const page = parseInt(pagination.page);
    const perPage = parseInt(pagination.perPage);
    const offset = (page - 1) * perPage;

    return this.userRepository.findAll({
      limit: perPage,
      offset: offset,
      where: builtFilter,
      include: [Farm, Group],
    });
  }

  async update(
    id: string,
    args: {
      email?: string;
      firstname?: string;
      lastname?: string;
      password?: string;
      uuid_forgot?: string;
    },
  ): Promise<User | null> {
    await this.userRepository.update(args, { where: { id } });
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: string, tokenDecode?: any): Promise<object> {
    const userId = tokenDecode.sub;
    if (id === userId) {
      throw new UnauthorizedException(
        'Usuario en sesión, no se puede eliminar',
      );
    }
    const users = await this.userRepository.findAll({
      where: { companyId: tokenDecode.companyId },
    });
    if (users.length <= 1) {
      throw new UnauthorizedException('No se puede borrar el usuario');
    }
    await this.userRepository.destroy({
      where: {
        id,
      },
    });
    return { message: 'delete success' };
  }

  async comparePassword(
    password: string,
    passwordSaved: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(
      bcrypt.hashSync(password, 10),
      passwordSaved,
    );
    return match;
  }
}
