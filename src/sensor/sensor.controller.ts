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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SensorService } from './sensor.service';
import { SensorDTO } from './dto/sensor.dto';

@ApiTags('sensor')
@Controller('sensors')
export class SensorController {
  constructor(private sensorService: SensorService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getSensors() {
    return this.sensorService.findAll();
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createSensor(@Body() sensorDto: SensorDTO) {
    return this.sensorService.create(sensorDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateSensor(@Param('id') id: string, @Body() sensorDto: SensorDTO) {
    return this.sensorService.update(id, sensorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteSensor(@Param('id') id: string) {
    return this.sensorService.delete(id);
  }
}
