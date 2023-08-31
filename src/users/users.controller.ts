import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDTO } from 'src/auth/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('users')
@Controller('users')
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
  createUser(@Body() userDTO: UserDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token);
    return this.usersService.create(userDTO, decodedToken);
  }

  @Patch('/')
  @HttpCode(HttpStatus.OK)
  editUser(@Body() userDTO: UserDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token);
    return this.usersService.create(userDTO, decodedToken);
  }

  @Delete('/')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Body() userDTO: UserDTO, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token);
    return this.usersService.create(userDTO, decodedToken);
  }
}
