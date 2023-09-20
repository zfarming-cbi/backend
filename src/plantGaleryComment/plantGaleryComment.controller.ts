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
import { PlantGaleryCommentService } from './plantGaleryComment.service';
import { PlantGaleryCommentDTO } from './dto/plantGaleryComment.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('comments-plant')
@ApiBearerAuth()
@Controller('comment-plant')
export class PlantGaleryCommentController {
  constructor(
    private plantGaleryCommentService: PlantGaleryCommentService,
    private jwtService: JwtService,
  ) {}

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

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateComment(
    @Param('id') id: string,
    @Body() plantGaleryCommentDTO: PlantGaleryCommentDTO,
  ) {
    return this.plantGaleryCommentService.update(id, plantGaleryCommentDTO);
  }
}
