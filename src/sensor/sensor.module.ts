import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';

@Module({
  providers: [SensorService, ...repositoryProviders],
  controllers: [SensorController],
  exports: [SensorService],
})
export class SensorModule {}
