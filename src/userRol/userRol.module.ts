import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { UserRolService } from './userRol.service';

@Module({
  providers: [UserRolService, ...repositoryProviders],
  exports: [UserRolService],
})
export class UserRolModule {}
