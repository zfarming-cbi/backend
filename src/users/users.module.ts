import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, ...repositoryProviders],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
