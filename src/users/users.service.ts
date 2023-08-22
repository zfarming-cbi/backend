import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/database/constants';
import { Company, User } from 'src/database/entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User,
  ) {}

  async create(args: {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    companyId?: string;
    company?: Company;
  }): Promise<User> {
    return await this.userRepository.create({
      firstname: args.firstname,
      lastname: args.lastname,
      username: args.username,
      password: args.password,
      companyId: args.companyId,
    });
  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  private async comparePassword(
    password: string,
    passwordSaved: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(password, passwordSaved);
    return match;
  }
}