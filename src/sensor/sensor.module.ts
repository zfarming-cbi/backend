import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { SensorService } from './sensor.service';

@Module({
  providers: [SensorService, ...repositoryProviders],
  exports: [SensorService],
})
export class SensorModule {}
