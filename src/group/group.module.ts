import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { GroupService } from './group.service';

@Module({
  providers: [GroupService, ...repositoryProviders],
  exports: [GroupService],
})
export class GroupModule {}
