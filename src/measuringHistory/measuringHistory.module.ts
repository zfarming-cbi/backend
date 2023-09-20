import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { MeasuringHistoryService } from './measuringHistory.service';
import { MeasuringHistoryController } from './measuringHistory.controller';

@Module({
  providers: [MeasuringHistoryService, ...repositoryProviders],
  controllers: [MeasuringHistoryController],
  exports: [MeasuringHistoryService],
})
export class MeasuringHistoryModule {}
