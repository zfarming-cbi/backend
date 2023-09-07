import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { MeasuringHistoryService } from './measuringHistory.service';

@Module({
  providers: [MeasuringHistoryService, ...repositoryProviders],
  exports: [MeasuringHistoryService],
})
export class MeasuringHistoryModule {}
