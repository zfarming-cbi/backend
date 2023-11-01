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
import { FarmService } from './farm.service';
import { JwtService } from '@nestjs/jwt';
import { FarmDTO, ShowFarmDTO } from './dto/farm.dto';

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
  async getFarms(@Request() req: any, @Query() show: ShowFarmDTO) {
    console.log('Aqui esta el search', show);
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    const farms = await this.farmService.findAll(decodeToken, show.option);
    return farms;
  }

  @Get('/user-asigned/:userId')
  @HttpCode(HttpStatus.OK)
  async getFarmsForAsigned(
    @Request() req: any,
    @Param('userId') userId: string,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    const farms = await this.farmService.findAllForAsigned(userId, decodeToken);
    return farms;
  }

  @Get(':farmId')
  @HttpCode(HttpStatus.OK)
  getFarm(@Param('farmId') farmId: string) {
    return this.farmService.findOne(farmId);
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
