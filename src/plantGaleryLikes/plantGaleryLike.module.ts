import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { PlantGaleryLikeService } from './plantGaleryLike.service';

@Module({
  providers: [PlantGaleryLikeService, ...repositoryProviders],
  exports: [PlantGaleryLikeService],
})
export class PlantGaleryLikeModule {}
