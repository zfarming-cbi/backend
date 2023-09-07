import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { CompanyController } from './company.controller';

@Module({
  providers: [CompanyService, ...repositoryProviders],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
