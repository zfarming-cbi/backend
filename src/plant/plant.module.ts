import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { PlantService } from './plant.service';
import { PlantController } from './plant.controller';

@Module({
  providers: [PlantService, ...repositoryProviders],
  controllers: [PlantController],
  exports: [PlantService],
})
export class PlantModule {}
