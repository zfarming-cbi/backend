import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { PlantGaleryCommentService } from './plantGaleryComment.service';
import { PlantGaleryCommentController } from './plantGaleryComment.controller';

@Module({
  providers: [PlantGaleryCommentService, ...repositoryProviders],
  controllers: [PlantGaleryCommentController],
  exports: [PlantGaleryCommentService],
})
export class PlantGaleryCommentModule {}
