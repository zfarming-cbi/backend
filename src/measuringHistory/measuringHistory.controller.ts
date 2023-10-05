import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MeasuringHistoryService } from './measuringHistory.service';
import { MeasuringHistoryDTO } from './dto/measuringHistory.dto';
import { Public } from 'src/auth/decorators/isPublic';

@ApiTags('measuring-history')
@Controller('measuring-history')
export class MeasuringHistoryController {
  constructor(private measuringService: MeasuringHistoryService) {}

  @Get('/:deviceId')
  @HttpCode(HttpStatus.OK)
  getMeasurings(@Param('deviceId') deviceId: string) {
    return this.measuringService.findAll(deviceId);
  }

  @Public()
  @Post('/')
  @HttpCode(HttpStatus.OK)
  createMeasurging(@Body() measuringHistoryDto: MeasuringHistoryDTO) {
    return this.measuringService.create(measuringHistoryDto);
  }

  // @Patch(':id') // toDO: Se puede actualizar la medida de un sensor
  // @HttpCode(HttpStatus.OK)
  // updateMeasuring(
  //   @Param('id') id: string,
  //   @Body() measuringHistoryDto: MeasuringHistoryDTO,
  // ) {
  //   return this.measuringService.update(id, measuringHistoryDto);
  // }
}
