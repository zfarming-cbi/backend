import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { RolService } from './rol.service';

@Module({
  providers: [RolService, ...repositoryProviders],
  exports: [RolService],
})
export class RolModule {}
