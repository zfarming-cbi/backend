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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { DeviceService } from './device.service';
import { DeviceDTO, UpdateDeviceDTO } from './dto/device.dto';

@ApiTags('device')
@ApiBearerAuth()
@Controller('device')
export class DeviceController {
  constructor(
    private deviceService: DeviceService,
    private jwtService: JwtService,
  ) {}

  @Get('/all/:farmid?')
  @HttpCode(HttpStatus.OK)
  getDevices(@Param('farmid') farmid: string, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.deviceService.findAll(farmid, decodeToken);
  }

  @Get(':deviceId')
  @HttpCode(HttpStatus.OK)
  getDevice(@Param('deviceId') deviceId: string) {
    return this.deviceService.findOne(deviceId);
  }

  @Get('/unasigned')
  @HttpCode(HttpStatus.OK)
  getDevicesUnasigned(@Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.deviceService.findAllUnasigned(decodeToken);
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
