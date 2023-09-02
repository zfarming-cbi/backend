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
import { UserDTO } from 'src/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('users')
@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getUsers(@Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = this.jwtService.decode(token);
    return this.usersService.findAll(decodeToken);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  createUser(@Body() userDto: UserDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token);
    return this.usersService.create(userDto, decodedToken);
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
