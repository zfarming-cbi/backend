import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { FarmController } from './farm.controller';

@Module({
  providers: [FarmService, ...repositoryProviders],
  controllers: [FarmController],
  exports: [FarmService],
})
export class FarmModule {}
