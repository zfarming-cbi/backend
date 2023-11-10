import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
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
    FileInterceptor('files', {
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

  @Post(':id')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('files', {
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
    // if (plantDto.growing_time) validFields.growing_time = plantDto.growing_time;
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

  @Post('/copy-plant')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async copyPlant(@Body() plantDto: PlantDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    const plant = await this.plantService.create(plantDto, decodeToken);
    const imagePath = plantDto.image;
    if (!imagePath || !fs.existsSync(imagePath)) {
      this.plantService.update(plant.id, {
        image: '',
      });
      return plant;
    }
    const filename = imagePath.split('/')[3];
    const finalImagePath = `images/plants/${plant.id}`;
    if (!fs.existsSync(finalImagePath)) {
      fs.mkdirSync(finalImagePath, { recursive: true });
    }
    fs.copyFile(imagePath, `${finalImagePath}/${filename}`, () => {
      this.plantService.update(plant.id, {
        image: `${finalImagePath}/${filename}`,
      });
    });
    return plant;
  }

  @Public()
  @Get('/:plantId')
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
