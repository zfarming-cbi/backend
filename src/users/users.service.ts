import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_REPOSITORY } from 'src/database/constants';
import { User } from 'src/database/entities';
import * as bcrypt from 'bcrypt';

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
      username: string;
      password: string;
      companyId?: string;
    },
    tokenDecode?: any,
  ): Promise<User> {
    const user = await this.findOne(args.username);
    if (user) throw new UnauthorizedException('El username ya esta en uso');
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
      username: args.username,
      password: args.password,
      companyId: companyId,
    });
  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findAll(tokenDecode?: any): Promise<User[] | null> {
    const companyId = tokenDecode.companyId;
    Logger.log(companyId);
    return this.userRepository.findAll({
      where: {
        companyId,
      },
    });
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
