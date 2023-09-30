import { Module } from '@nestjs/common';
import { repositoryProviders } from 'src/database/entities/repository.providers';
import { PlantGaleryLikeService } from './plantGaleryLike.service';
import { PlantGaleryLikeController } from './plantGaleryLike.controller';

@Module({
  providers: [PlantGaleryLikeService, ...repositoryProviders],
  controllers: [PlantGaleryLikeController],
  exports: [PlantGaleryLikeService],
})
export class PlantGaleryLikeModule {}
