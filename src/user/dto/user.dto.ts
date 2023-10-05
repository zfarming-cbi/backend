import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  rol: string;
}
