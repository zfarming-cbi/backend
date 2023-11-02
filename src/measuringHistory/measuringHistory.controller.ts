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
import { MeasuringHistoryService } from './measuringHistory.service';
import { MeasuringHistoryDTO } from './dto/measuringHistory.dto';
import { Public } from 'src/auth/decorators/isPublic';

@ApiTags('measuring-history')
@Controller('measuring-history')
export class MeasuringHistoryController {
  constructor(private measuringService: MeasuringHistoryService) {}

  @Get('/:deviceId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getMeasurings(@Param('deviceId') deviceId: string) {
    return this.measuringService.findAll(deviceId);
  }

  @Get('/average/:deviceId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getMeasuringsByDays(@Param('deviceId') deviceId: string) {
    return this.measuringService.findDataForDays(deviceId);
  }

  @Public()
  @Post('/')
  @HttpCode(HttpStatus.OK)
  createMeasurging(@Body() measuringHistoryDto: MeasuringHistoryDTO) {
    return this.measuringService.create(measuringHistoryDto);
  }
}
