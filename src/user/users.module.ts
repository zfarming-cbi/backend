import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { UsersController } from './users.controller';
import { FarmService } from 'src/farm/farm.service';

@Module({
  providers: [UsersService, FarmService, ...repositoryProviders],
  controllers: [UsersController],
  exports: [UsersService, FarmService],
})
export class UsersModule {}
