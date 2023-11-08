import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MeasuringHistoryService } from './measuringHistory.service';
import { MeasuringHistoryDTO } from './dto/measuringHistory.dto';
import { Public } from 'src/auth/decorators/isPublic';
import { ShowFarmDTO } from 'src/farm/dto/farm.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('measuring-history')
@Controller('measuring-history')
export class MeasuringHistoryController {
  constructor(
    private measuringService: MeasuringHistoryService,
    private jwtService: JwtService,
  ) {}

  @Get('/history-farms')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getMeasuringsHistroy(@Request() req: any, @Query() show: ShowFarmDTO) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.measuringService.findAllForHistory(decodeToken, show.option);
  }

  @Get('/average/:deviceId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getMeasuringsByDays(@Param('deviceId') deviceId: string) {
    return this.measuringService.findDataForDays(deviceId);
  }

  @Get('/:deviceId')
  @ApiBearerAuth()
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
}
