import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlantGaleryLikeService } from './plantGaleryLike.service';
import { PlantGaleryLikeDTO } from './dto/plantGaleryLike.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/auth/decorators/isPublic';

@ApiTags('likes-plant')
@ApiBearerAuth()
@Controller('like-plant')
export class PlantGaleryLikeController {
  constructor(
    private plantGaleryLikeService: PlantGaleryLikeService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Get('/:plantId')
  @HttpCode(HttpStatus.OK)
  getLikes(@Param('plantId') plantId: string) {
    return this.plantGaleryLikeService.findAll(plantId);
  }

  @Public()
  @Get('/:plantId/:userId')
  @HttpCode(HttpStatus.OK)
  getLike(@Param('plantId') plantId: string, @Param('userId') userId: string) {
    return this.plantGaleryLikeService.findOne(plantId, userId);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createLike(@Body() plantGaleryLikeDTO: PlantGaleryLikeDTO) {
    return this.plantGaleryLikeService.create(plantGaleryLikeDTO);
  }

  // @Patch(':id') // toDO: ¿Se puede actualizar un like?
  // @HttpCode(HttpStatus.OK)
  // updateLike(
  //   @Param('id') id: string,
  //   @Body() plantGaleryLikeDTO: PlantGaleryLikeDTO,
  // ) {
  //   return this.plantGaleryLikeService.update(id, plantGaleryLikeDTO);
  // }
}
