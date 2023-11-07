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
import { SuggestionDTO } from './dto/suggestion.dto';
import { SuggestionService } from './suggestion.service';
import { PaginationDTO } from 'src/pagination/dto/pagination.dto';

@ApiTags('pqrs')
@ApiBearerAuth()
@Controller('pqrs')
export class SuggestionController {
  constructor(
    private suggestionService: SuggestionService,
    private jwtService: JwtService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getTickets(@Request() req: any, @Query() pagination: PaginationDTO) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.suggestionService.findAll(pagination, decodeToken);
  }

  @Get(':pqrsId')
  @HttpCode(HttpStatus.OK)
  getPqrs(@Param('pqrsId') pqrsId: string) {
    return this.suggestionService.findOne(pqrsId);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createPqrs(@Body() pqrsDto: SuggestionDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.suggestionService.create(pqrsDto, decodeToken);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updatePqrs(@Param('id') id: string, @Body() pqrsDto: SuggestionDTO) {
    return this.suggestionService.update(id, pqrsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deletePqrs(@Param('id') id: string) {
    return this.suggestionService.delete(id);
  }
}
