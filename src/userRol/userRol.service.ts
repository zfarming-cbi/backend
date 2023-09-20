import { Inject, Injectable } from '@nestjs/common';
import { USER_ROL_REPOSITORY } from 'src/database/constants';
import { UserRol } from 'src/database/entities';

@Injectable()
export class UserRolService {
  constructor(
    @Inject(USER_ROL_REPOSITORY)
    private userRolRepository: typeof UserRol,
  ) {}

  async findOne(code: string): Promise<UserRol | null> {
    console.log('Aqui esta el repo o la entity', this.userRolRepository);
    return this.userRolRepository.findOne({
      where: {
        code,
      },
    });
  }
}
