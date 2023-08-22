import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { repositoryProviders } from 'src/database/entities/repository.providers';

@Module({
  providers: [CompanyService, ...repositoryProviders],
  exports: [CompanyService],
})
export class CompanyModule {}
