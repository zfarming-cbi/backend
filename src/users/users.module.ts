import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { repositoryProviders } from 'src/database/entities/repository.providers';

@Module({
  providers: [UsersService, ...repositoryProviders],
  exports: [UsersService],
})
export class UsersModule {}
