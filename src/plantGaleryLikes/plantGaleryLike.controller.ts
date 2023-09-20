import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlantGaleryLikeService } from './plantGaleryLike.service';
import { PlantGaleryLikeDTO } from './dto/plantGaleryLike.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('galery-likes')
@ApiBearerAuth()
@Controller('galery-like')
export class PlantGaleryLikeController {
  constructor(
    private plantGaleryLikeService: PlantGaleryLikeService,
    private jwtService: JwtService,
  ) {}

  @Get('/:plantId')
  @HttpCode(HttpStatus.OK)
  getLikes(@Param('plantId') plantId: string) {
    return this.plantGaleryLikeService.findAll(plantId);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createLike(
    @Body() plantGaleryLikeDTO: PlantGaleryLikeDTO,
    @Request() req: any,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.plantGaleryLikeService.create(plantGaleryLikeDTO, decodeToken);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateLike(
    @Param('id') id: string,
    @Body() plantGaleryLikeDTO: PlantGaleryLikeDTO,
  ) {
    return this.plantGaleryLikeService.update(id, plantGaleryLikeDTO);
  }
}
