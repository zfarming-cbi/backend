import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { SuggestionService } from './suggestion.service';
import { SuggestionController } from './suggestion.controller';

@Module({
  providers: [SuggestionService, ...repositoryProviders],
  controllers: [SuggestionController],
  exports: [SuggestionService],
})
export class SuggestionModule {}
