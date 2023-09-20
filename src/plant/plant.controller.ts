import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { PlantService } from './plant.service';
import { PaginationPlantDTO, PlantDTO } from './dto/plant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { destination, renameImage } from 'src/helpers/images/images.helpers';
import { Public } from 'src/auth/decorators/isPublic';

@ApiTags('plant')
@Controller('plants')
export class PlantController {
  constructor(
    private plantService: PlantService,
    private jwtService: JwtService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getPlants(@Request() req: any, @Query() pagination: PaginationPlantDTO) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.plantService.findAll(pagination, decodeToken);
  }

  @Public()
  @Get('/galery')
  @HttpCode(HttpStatus.OK)
  getAllPlants(@Query() pagination: PaginationPlantDTO) {
    return this.plantService.findAllForGalery(pagination);
  }

  @Post('/')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: destination,
        filename: renameImage,
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: PlantDTO,
  })
  @HttpCode(HttpStatus.OK)
  createPlant(
    @Body() plantDto: PlantDTO,
    @Request() req: any,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    plantDto.image = image.path;
    return this.plantService.create(plantDto, decodeToken);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: destination,
        filename: renameImage,
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: PlantDTO,
  })
  @HttpCode(HttpStatus.OK)
  updatePlant(
    @Param('id') id: string,
    @Body() plantDto: PlantDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    plantDto.image = image.path;
    return this.plantService.update(id, plantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deletePlant(@Param('id') id: string) {
    return this.plantService.delete(id);
  }
}
