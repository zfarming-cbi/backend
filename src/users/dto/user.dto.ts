import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsEmail()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  firstname: string;
  @ApiProperty()
  @IsNotEmpty()
  lastname: string;
}
