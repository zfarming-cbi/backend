import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlantGaleryCommentService } from './plantGaleryComment.service';
import { PlantGaleryCommentDTO } from './dto/plantGaleryComment.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/auth/decorators/isPublic';

@ApiTags('comments-plant')
@Controller('comment-plant')
export class PlantGaleryCommentController {
  constructor(
    private plantGaleryCommentService: PlantGaleryCommentService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Get('/:plantId')
  @HttpCode(HttpStatus.OK)
  getComments(@Param('plantId') plantId: string) {
    return this.plantGaleryCommentService.findAll(plantId);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createComment(
    @Body() plantGaleryCommentDTO: PlantGaleryCommentDTO,
    @Request() req: any,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.plantGaleryCommentService.create(
      plantGaleryCommentDTO,
      decodeToken,
    );
  }

  // @Patch(':id') // toDO: ¿Se puede actualizar un comentario?
  // @HttpCode(HttpStatus.OK)
  // updateComment(
  //   @Param('id') id: string,
  //   @Body() plantGaleryCommentDTO: PlantGaleryCommentDTO,
  // ) {
  //   return this.plantGaleryCommentService.update(id, plantGaleryCommentDTO);
  // }
}
