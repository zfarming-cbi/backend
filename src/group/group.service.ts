import { Inject, Injectable } from '@nestjs/common';
import { GROUP_REPOSITORY } from 'src/database/constants';
import { Group, User } from 'src/database/entities';

@Injectable()
export class GroupService {
  constructor(
    @Inject(GROUP_REPOSITORY)
    private groupRepository: typeof Group,
  ) {}

  async findOne(code: string): Promise<Group | null> {
    console.log('Aqui esta el repo o la entity', this.groupRepository);
    return this.groupRepository.findOne({
      where: {
        code,
      },
      include: User,
    });
  }

  async findAll(): Promise<Group[] | null> {
    console.log('Aqui esta el repo o la entity', this.groupRepository);
    return this.groupRepository.findAll({
      include: User,
    });
  }
}
