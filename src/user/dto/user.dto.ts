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
  farmId?: string[];
}

export class UpdateUserDTO {
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  rol?: string;
  farmId?: string[];
}
