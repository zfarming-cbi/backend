import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { PqrsService } from './pqrs.service';
import { PqrsController } from './pqrs.controller';

@Module({
  providers: [PqrsService, ...repositoryProviders],
  controllers: [PqrsController],
  exports: [PqrsService],
})
export class PqrsModule {}
