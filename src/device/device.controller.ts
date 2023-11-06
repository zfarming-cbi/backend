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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { DeviceService } from './device.service';
import { DeviceDTO, UpdateDeviceDTO } from './dto/device.dto';
import { PaginationDTO } from 'src/pagination/dto/pagination.dto';

@ApiTags('device')
@ApiBearerAuth()
@Controller('device')
export class DeviceController {
  constructor(
    private deviceService: DeviceService,
    private jwtService: JwtService,
  ) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  getDevices(@Request() req: any, @Query() pagination: PaginationDTO) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.deviceService.findAll(pagination, decodeToken);
  }

  @Get('/by-farm/:farmid')
  @HttpCode(HttpStatus.OK)
  getDevicesByFarm(@Param('farmid') farmId: string, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.deviceService.findDeviceByFarm(farmId, decodeToken);
  }

  @Get(':deviceId')
  @HttpCode(HttpStatus.OK)
  getDevice(@Param('deviceId') deviceId: string) {
    return this.deviceService.findOne(deviceId);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getDevicesUnasigned(@Request() req: any, @Query() pagination: PaginationDTO) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    const devices = this.deviceService.findAllUnasigned(
      pagination,
      decodeToken,
    );
    return devices;
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createDevice(@Body() deviceDto: DeviceDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.deviceService.create(deviceDto, decodeToken);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateDevice(@Param('id') id: string, @Body() deviceDto: UpdateDeviceDTO) {
    return this.deviceService.update(id, deviceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteDevice(@Param('id') id: string) {
    return this.deviceService.delete(id);
  }
}
