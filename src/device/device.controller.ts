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
import { DeviceService } from './device.service';
import { DeviceDTO } from './dto/device.dto';

@ApiTags('device')
@Controller('devices')
export class DeviceController {
  constructor(
    private deviceService: DeviceService,
    private jwtService: JwtService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getDevices(@Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.deviceService.findAll(decodeToken);
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
  updateDevice(@Param('id') id: string, @Body() deviceDto: DeviceDTO) {
    return this.deviceService.update(id, deviceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteDevice(@Param('id') id: string) {
    return this.deviceService.delete(id);
  }
}
