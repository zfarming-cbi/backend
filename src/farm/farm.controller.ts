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
import { FarmService } from './farm.service';
import { JwtService } from '@nestjs/jwt';
import { FarmDTO } from './dto/farm.dto';

@ApiTags('farm')
@ApiBearerAuth()
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
    console.log(decodeToken);
    return this.farmService.findAll(decodeToken);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createFarms(@Body() farmDto: FarmDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.farmService.create(farmDto, decodeToken);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') id: string, @Body() farmDto: FarmDTO) {
    return this.farmService.update(id, farmDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string) {
    return this.farmService.delete(id);
  }
}
