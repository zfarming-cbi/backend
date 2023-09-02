import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

@Module({
  providers: [DeviceService, ...repositoryProviders],
  controllers: [DeviceController],
  exports: [DeviceService],
})
export class DeviceModule {}
