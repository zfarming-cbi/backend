import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { repositoryProviders } from './entities/repository.providers';

@Module({
  providers: [...databaseProviders, ...repositoryProviders],
  exports: [...databaseProviders, ...repositoryProviders],
})
export class DatabaseModule {}
