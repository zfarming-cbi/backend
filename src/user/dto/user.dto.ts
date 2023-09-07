import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsEmail()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
}
