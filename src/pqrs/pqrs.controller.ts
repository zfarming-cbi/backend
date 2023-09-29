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
import { PqrsDTO } from './dto/pqrs.dto';
import { PqrsService } from './pqrs.service';
import { PaginationDTO } from 'src/pagination/dto/pagination.dto';

@ApiTags('pqrs')
@ApiBearerAuth()
@Controller('pqrs')
export class PqrsController {
  constructor(
    private pqrsService: PqrsService,
    private jwtService: JwtService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getTickets(@Request() req: any, @Query() pagination: PaginationDTO) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.pqrsService.findAll(pagination, decodeToken);
  }

  @Get(':pqrsId')
  @HttpCode(HttpStatus.OK)
  getPqrs(@Param('pqrsId') pqrsId: string) {
    return this.pqrsService.findOne(pqrsId);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createPqrs(@Body() pqrsDto: PqrsDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.pqrsService.create(pqrsDto, decodeToken);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updatePqrs(@Param('id') id: string, @Body() pqrsDto: PqrsDTO) {
    return this.pqrsService.update(id, pqrsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deletePqrs(@Param('id') id: string) {
    return this.pqrsService.delete(id);
  }
}
