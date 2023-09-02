import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  username: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
