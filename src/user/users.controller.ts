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
import { UsersService } from './users.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('users')
@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get(':companyId')
  @HttpCode(HttpStatus.OK)
  getUsers(@Param('companyId') companyId: number) {
    return this.usersService.findAll(companyId);
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
