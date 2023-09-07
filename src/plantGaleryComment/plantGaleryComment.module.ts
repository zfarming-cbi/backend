import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { PlantGaleryCommentService } from './plantGaleryComment.service';

@Module({
  providers: [PlantGaleryCommentService, ...repositoryProviders],
  exports: [PlantGaleryCommentService],
})
export class PlantGaleryCommentModule {}
