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
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { PlantService } from './plant.service';
import { PlantDTO } from './dto/plant.dto';

@ApiTags('plant')
@Controller('plants')
export class PlantController {
  constructor(
    private plantService: PlantService,
    private jwtService: JwtService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getPlants(@Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.plantService.findAll(decodeToken);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createPlant(@Body() plantDto: PlantDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.plantService.create(plantDto, decodeToken);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updatePlant(@Param('id') id: string, @Body() plantDto: PlantDTO) {
    return this.plantService.update(id, plantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deletePlant(@Param('id') id: string) {
    return this.plantService.delete(id);
  }
}
