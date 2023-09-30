import {
  BadRequestException,
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
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { PlantService } from './plant.service';
import { PlantDTO, UpdatePlantDTO } from './dto/plant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { destination, renameImage } from 'src/helpers/images/images.helpers';
import { Public } from 'src/auth/decorators/isPublic';
import * as fs from 'fs';
import { Response } from 'express';
import { PaginationDTO } from 'src/pagination/dto/pagination.dto';

@ApiTags('plant')
@Controller('plants')
export class PlantController {
  constructor(
    private plantService: PlantService,
    private jwtService: JwtService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  getPlants(@Request() req: any, @Query() pagination: PaginationDTO) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.plantService.findAll(pagination, decodeToken);
  }

  @Public()
  @Get('/galery')
  @HttpCode(HttpStatus.OK)
  getAllPlants(@Query() pagination: PaginationDTO) {
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
  async createPlant(
    @Body() plantDto: PlantDTO,
    @Request() req: any,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    const tempImagePath = image ? image.path : null;
    const plant = await this.plantService.create(plantDto, decodeToken);
    if (tempImagePath) {
      const finalImagePath = `images/plants/${plant.id}`;
      if (!fs.existsSync(finalImagePath)) {
        fs.mkdirSync(finalImagePath, { recursive: true });
      }
      fs.renameSync(tempImagePath, `${finalImagePath}/${image.originalname}`);
      await this.plantService.update(plant.id, {
        image: `${finalImagePath}/${image.originalname}`,
      });
    }
    return plant;
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
  @HttpCode(HttpStatus.OK)
  async updatePlant(
    @Param('id') id: string,
    @Body() plantDto: UpdatePlantDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const validFields: Partial<UpdatePlantDTO> = {};
    if (plantDto.name) validFields.name = plantDto.name;
    if (plantDto.content) validFields.content = plantDto.content;
    if (plantDto.public) validFields.public = plantDto.public;
    if (plantDto.growing_time) validFields.growing_time = plantDto.growing_time;
    const tempImagePath = image ? image.path : null;
    const plant = await this.plantService.findOne(id);
    if (tempImagePath) {
      const finalImagePath = `images/plants/${id}`;
      if (!fs.existsSync(finalImagePath)) {
        fs.mkdirSync(finalImagePath, { recursive: true });
      }
      if (plant?.image && fs.existsSync(plant.image)) {
        fs.unlink(plant.image ?? '', (error) => {
          if (error) {
            throw new BadRequestException(`Error al borrar ${plant?.image}:`);
          }
        });
      }
      fs.renameSync(tempImagePath, `${finalImagePath}/${image.originalname}`);
      validFields.image = `${finalImagePath}/${image.originalname}`;
    }
    return this.plantService.update(id, validFields);
  }

  @Get('/image/:plantId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async getImage(@Param('plantId') plantId: string, @Res() res: Response) {
    const plant = await this.plantService.findOne(plantId);
    if (!fs.existsSync(plant?.image ?? '')) {
      return res.status(404).send('Imagen no encontrada');
    }
    res.sendFile(plant?.image ?? '', { root: './' });
  }

  @Public()
  @Get('/:plantId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async getPlant(@Param('plantId') plantId: string) {
    return await this.plantService.findOne(plantId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deletePlant(@Param('id') id: string) {
    return this.plantService.delete(id);
  }
}
