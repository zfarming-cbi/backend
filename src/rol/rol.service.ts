import { Inject, Injectable } from '@nestjs/common';
import { ROL_REPOSITORY } from 'src/database/constants';
import { Rol } from 'src/database/entities';

@Injectable()
export class RolService {
  constructor(
    @Inject(ROL_REPOSITORY)
    private rolRepository: typeof Rol,
  ) {}

  async findOne(code: string): Promise<Rol | null> {
    console.log('Aqui esta el repo o la entity', this.rolRepository);
    return this.rolRepository.findOne({
      where: {
        code,
      },
    });
  }
}
