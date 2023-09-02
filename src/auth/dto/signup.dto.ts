import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDTO {
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
  @ApiProperty()
  @IsNotEmpty()
  company: string;
  @ApiProperty()
  @IsNotEmpty()
  nit: string;
}
