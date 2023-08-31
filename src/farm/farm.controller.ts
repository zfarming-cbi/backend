import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FarmService } from './farm.service';
import { FarmDTO } from 'src/auth/dto/farm.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('farm')
@Controller('farms')
export class FarmController {
  constructor(
    private farmService: FarmService,
    private jwtService: JwtService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getFarms(@Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.farmService.findAll(decodeToken);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createFarms(@Body() farmDTO: FarmDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.farmService.create(farmDTO, decodeToken);
  }
}
