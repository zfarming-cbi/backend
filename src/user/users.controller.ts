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
import { UsersService } from './users.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { PaginationDTO } from 'src/pagination/dto/pagination.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get('/company/:companyId')
  @HttpCode(HttpStatus.OK)
  getUsers(
    @Param('companyId') companyId: number,
    @Query() pagination: PaginationDTO,
  ) {
    return this.usersService.findAll(pagination, companyId);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createUser(@Body() userDto: UserDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token);
    return this.usersService.create(userDto, decodedToken);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: string) {
    console.log('si esta entrando aqui ');
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') id: string, @Body() userDto: UserDTO) {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
