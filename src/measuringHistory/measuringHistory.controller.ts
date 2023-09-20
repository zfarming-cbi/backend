import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MeasuringHistoryService } from './measuringHistory.service';
import { MeasuringHistoryDTO } from './dto/measuringHistory.dt.';

@ApiTags('measuring-history')
@ApiBearerAuth()
@Controller('measuring-history')
export class MeasuringHistoryController {
  constructor(private measuringService: MeasuringHistoryService) {}

  @Get('/:farmId')
  @HttpCode(HttpStatus.OK)
  getMeasurings(@Param('farmId') farmId: string) {
    return this.measuringService.findAll(farmId);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createMeasurging(@Body() measuringHistoryDto: MeasuringHistoryDTO) {
    return this.measuringService.create(measuringHistoryDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateMeasuring(
    @Param('id') id: string,
    @Body() measuringHistoryDto: MeasuringHistoryDTO,
  ) {
    return this.measuringService.update(id, measuringHistoryDto);
  }
}
