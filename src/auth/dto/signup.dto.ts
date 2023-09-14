import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  company: string;
  @IsNotEmpty()
  nit: string;
}
